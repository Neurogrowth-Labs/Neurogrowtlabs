import React, { useState, useRef } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Image as ImageIcon, Search, MapPin, Loader2, Upload, Brain } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import BrandLogo from '../components/BrandLogo';
import { env, hasGeminiApiKey } from '../env';

const ai = hasGeminiApiKey() ? new GoogleGenAI({ apiKey: env.geminiApiKey }) : null;

export default function Portal() {
  const { user, loading, signIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'image' | 'search' | 'maps'>('image');
  
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [groundingUrls, setGroundingUrls] = useState<{uri: string, title: string}[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-electric-blue animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-midnight-black flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-graphite-grey p-6 sm:p-8 rounded-2xl border border-glass-border text-center">
          <div className="w-20 h-20 bg-electric-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 px-3">
            <BrandLogo className="w-full h-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">NeuroGrowth Portal</h2>
          <p className="text-gray-400 mb-8">Sign in to access enterprise AI tools.</p>
          <button
            onClick={signIn}
            className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <img src="https://www.gstatic.com/mobilesdk/250721_mobilesdk/mono_firebase_dark.svg" alt="Firebase" className="w-5 h-5" />
            Sign in with Google
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-3 bg-transparent text-gray-400 font-semibold rounded-lg hover:text-white transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAnalysis = async (query: string, res: string) => {
    try {
      await addDoc(collection(db, 'analyses'), {
        id: crypto.randomUUID(),
        userId: user.uid,
        type: activeTab,
        query: query,
        result: res,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Failed to save analysis", error);
    }
  };

  const runAnalysis = async () => {
    if (!input && !imageFile) return;
    setIsProcessing(true);
    setResult(null);
    setGroundingUrls([]);

    try {
      if (!ai) {
        throw new Error('Missing VITE_GEMINI_API_KEY in .env.local');
      }

      let responseText = '';

      if (activeTab === 'image') {
        if (!imageFile) throw new Error("Please upload an image");
        
        const base64Data = imagePreview?.split(',')[1];
        if (!base64Data) throw new Error("Failed to process image");

        const response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: {
            parts: [
              { inlineData: { data: base64Data, mimeType: imageFile.type } },
              { text: input || "Analyze this image in detail." }
            ]
          }
        });
        responseText = response.text || '';
      } 
      else if (activeTab === 'search') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: input,
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        responseText = response.text || '';
        
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const urls = chunks.map(c => c.web).filter(Boolean) as {uri: string, title: string}[];
          setGroundingUrls(urls);
        }
      }
      else if (activeTab === 'maps') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: input,
          config: {
            tools: [{ googleMaps: {} }]
          }
        });
        responseText = response.text || '';
        
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          const urls: {uri: string, title: string}[] = [];
          chunks.forEach(c => {
            if (c.maps?.uri) {
              urls.push({ uri: c.maps.uri, title: c.maps.title || 'Map Location' });
            }
          });
          setGroundingUrls(urls);
        }
      }

      setResult(responseText);
      await saveAnalysis(input || 'Image Analysis', responseText);

    } catch (error: any) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-black text-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-64 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-glass-border bg-deep-space-blue flex flex-col">
        <div className="p-4 sm:p-6 border-b border-glass-border">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <BrandLogo className="h-7 w-auto max-w-[160px]" />
            <span className="sr-only">NeuroGrowth Labs</span>
          </div>
        </div>
        
        <div className="flex-1 py-4 lg:py-6 px-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1">
          <button
            onClick={() => { setActiveTab('image'); setResult(null); setInput(''); }}
            className={`min-w-max lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'image' ? 'bg-electric-blue/10 text-electric-blue' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <ImageIcon className="w-5 h-5" />
            <span className="font-medium">Image Analysis</span>
          </button>
          <button
            onClick={() => { setActiveTab('search'); setResult(null); setInput(''); }}
            className={`min-w-max lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'search' ? 'bg-electric-blue/10 text-electric-blue' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Search Grounding</span>
          </button>
          <button
            onClick={() => { setActiveTab('maps'); setResult(null); setInput(''); }}
            className={`min-w-max lg:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'maps' ? 'bg-electric-blue/10 text-electric-blue' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Maps Grounding</span>
          </button>
          </div>
        </div>

        <div className="p-4 border-t border-glass-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            {user.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-graphite-grey" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.displayName || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:h-screen overflow-hidden">
        <header className="min-h-20 border-b border-glass-border flex items-center px-4 sm:px-6 lg:px-8 py-4 bg-midnight-black/50 backdrop-blur-md">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {activeTab === 'image' && 'Vision Intelligence'}
              {activeTab === 'search' && 'Global Search Intelligence'}
              {activeTab === 'maps' && 'Geospatial Intelligence'}
            </h1>
            {!hasGeminiApiKey() && (
              <p className="text-sm text-amber-300 mt-1">
                Add `VITE_GEMINI_API_KEY` to `.env.local` to run Gemini analyses locally.
              </p>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Input Area */}
            <div className="bg-graphite-grey/50 border border-glass-border rounded-2xl p-4 sm:p-6">
              {activeTab === 'image' && (
                <div className="mb-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-glass-border rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-electric-blue hover:bg-electric-blue/5 transition-all"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-64 max-w-full mx-auto rounded-lg object-contain" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <Upload className="w-8 h-8 mb-3" />
                        <p className="font-medium">Click to upload image</p>
                        <p className="text-sm mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    activeTab === 'image' ? "Ask a question about the image (optional)..." :
                    activeTab === 'search' ? "Search for real-time global intelligence..." :
                    "Search for locations, businesses, or geospatial data..."
                  }
                  className="flex-1 min-w-0 bg-midnight-black border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && runAnalysis()}
                />
                <button
                  onClick={runAnalysis}
                  disabled={isProcessing || (!input && !imageFile)}
                  className="px-6 py-3 bg-electric-blue text-black font-semibold rounded-xl hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:self-auto"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
                </button>
              </div>
            </div>

            {/* Results Area */}
            {result && (
              <div className="bg-graphite-grey/30 border border-glass-border rounded-2xl p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-electric-blue">
                  <Brain className="w-5 h-5" />
                  Analysis Result
                </h3>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans">
                    {result}
                  </div>
                </div>

                {groundingUrls.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-glass-border">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Sources</h4>
                    <div className="flex flex-wrap gap-3">
                      {groundingUrls.map((url, i) => (
                        <a 
                          key={i} 
                          href={url.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-electric-blue hover:bg-white/10 transition-colors flex items-center gap-2 truncate max-w-full sm:max-w-[300px]"
                        >
                          <span className="truncate">{url.title || url.uri}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
