import React, { useState, useEffect } from 'react';

interface LogoFetcherProps {
  name: string;
  className?: string;
  alt?: string;
  fallbackIcon?: string;
}

// interface LogoResponse {
//   data: {
//     id: string;
//     url: string;
//   }[];
// }

//Logo response is set of objects with domain,logo_url and name
interface LogoResponse {
    domain: string;
    logo_url: string;
    name: string;
}


const LogoFetcher: React.FC<LogoFetcherProps> = ({ 
  name, 
  className = "w-10 h-10", 
  alt = "Company Logo",
  fallbackIcon = "/api/placeholder/40/40"
}) => {
  const [logoUrl, setLogoUrl] = useState<string>(fallbackIcon);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.logo.dev/search?q=${encodeURIComponent(name)}`, 
          {
            headers: {
              "Authorization": `Bearer: sk_CVim8r0ASkmXs9mevNW3Vw`,
              "Content-Type": "application/json"
            }
          }
        );
       console.log(response);

        if (!response.ok) {
          throw new Error(`Failed to fetch logo: ${response.status}`);
        }

        const data: any = await response.json();
        const detailData: LogoResponse = data[0];
        console.log(detailData);
        if (!detailData) {
          throw new Error('No logo found');
        }

        setLogoUrl(detailData.logo_url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch logo');
        setLogoUrl(fallbackIcon);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchLogo();
    }
  }, [name, fallbackIcon]);

  if (loading) {
    return (
      <div className={`${className} animate-pulse bg-gray-200 rounded-full`} />
    );
  }

  if (error) {
    console.error('Logo fetch error:', error);
    return <img src={fallbackIcon} alt={alt} className={className} />;
  }

  return (
    <img 
      src={logoUrl} 
      alt={alt}
      className={className}
      onError={() => setLogoUrl(fallbackIcon)}
    />
  );
};

export default LogoFetcher;