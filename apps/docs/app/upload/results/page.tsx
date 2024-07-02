'use client'

import { useUserStore } from "../../hooks/useState";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScanningScreen } from "@repo/ui/components/ui/scanningScreen";
import { ResultsScreen } from "@repo/ui/components/ui/resultsScreen";

interface Image {
  id: string;
  s3_url: string;
}

export default function UploadResults() {
  const router = useRouter()
  const { user } = useUserStore(({ user }) => ({ user }));
  const [images, setImages] = useState<Image[]>([]);
  const [imagesReady, setImagesReady] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  useEffect(() => {
    if (!user) router.push('/')
    const loadUserImages = async () => {
      try {
        const response = await fetch(`http://localhost:5001/photos/${user?.id}`);
        if (!response.ok) {
          throw new Error('Get images failed');
        }
        const data = await response.json();
        setImages(data);
        setImagesReady(true);
      } catch (err) {
        console.error('Get images failed', err);
      }
    };
    loadUserImages()
  }, [user?.id])
  useEffect(() => {
    if (!imagesReady) return;
    setTimeout(() => {
      setIsScanning(false)
    }, 5000)
  }, [imagesReady])
  return (
    <div>
      { isScanning ?
        <ScanningScreen className={`absolute inset-0`} images={images} />
        :
        <ResultsScreen className={`absolute inset-0`} images={images} />
      }
    </div>
  );
}