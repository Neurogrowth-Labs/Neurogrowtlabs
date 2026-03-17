import React from 'react';

type BrandLogoProps = {
  className?: string;
  alt?: string;
};

export default function BrandLogo({
  className = '',
  alt = 'NeuroGrowth Labs logo',
}: BrandLogoProps) {
  return (
    <img
      src="/logo.svg"
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
