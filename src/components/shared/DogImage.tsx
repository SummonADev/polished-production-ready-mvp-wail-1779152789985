import styles from './DogImage.module.css';

type DogImageProps = {
  variant?: 'golden' | 'frenchie' | 'collie' | 'labrador' | 'corgi' | 'poodle' | 'husky' | 'dachshund';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  caption?: string;
};

const DOG_CONFIGS = {
  golden: {
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    alt: 'Golden Retriever in elegant tuxedo at a wedding',
    accent: '#D4AF37',
  },
  frenchie: {
    url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&q=80',
    alt: 'French Bulldog dressed in formal bow tie for a wedding',
    accent: '#F4A261',
  },
  collie: {
    url: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=800&q=80',
    alt: 'Border Collie wearing a custom wedding outfit',
    accent: '#2D1B69',
  },
  labrador: {
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    alt: 'Labrador in black tie formalwear',
    accent: '#22C55E',
  },
  corgi: {
    url: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800&q=80',
    alt: 'Corgi wearing a tiny tuxedo jacket',
    accent: '#F59E0B',
  },
  poodle: {
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
    alt: 'Poodle in elegant white wedding attire',
    accent: '#EC4899',
  },
  husky: {
    url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80',
    alt: 'Husky dressed in formal wedding suit',
    accent: '#3B82F6',
  },
  dachshund: {
    url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80',
    alt: 'Dachshund in adorable wedding tuxedo',
    accent: '#8B5CF6',
  },
};

export default function DogImage({ variant = 'golden', size = 'md', className = '', caption }: DogImageProps) {
  const config = DOG_CONFIGS[variant];
  return (
    <figure className={`${styles.figure} ${styles[size]} ${className}`}>
      <div className={styles.imgWrapper} style={{ '--accent': config.accent } as React.CSSProperties}>
        <img
          src={config.url}
          alt={config.alt}
          className={styles.img}
          loading="lazy"
        />
        <div className={styles.badge}>🎩 Bark & Bow</div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export { DOG_CONFIGS };
