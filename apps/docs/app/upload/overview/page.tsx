'use client'

import { Logo } from "@repo/ui/components/ui/logo";
import { body, h3 } from "@ui/typography";
import { useUserStore } from "../../hooks/useState";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionableImageWrapper } from "@repo/ui/components/ui/actionableImageWrapper";
import { AddMore } from "@repo/ui/components/ui/addMore";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";

interface Image {
  id: string;
  s3_url: string;
}

export default function UploadOverview() {
  const router = useRouter()
  const { user } = useUserStore(({ user }) => ({ user }));
  const [images, setImages] = useState<Image[]>([]);
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
        console.log(data)
      } catch (err) {
        console.error('Get images failed', err);
      }
    };
    loadUserImages()
  }, [user?.id])
  const onDeleteImage = (id: string) => {
    const deleteImageById = async () => {
      try {
        const response = await fetch(`http://localhost:5001/photos/${user?.id}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Delete image failed');
        }
        const data = await response.json();
        setImages(images.filter(image => image.id !== id));
        console.error('Image deleted', data);
      } catch (err) {
        console.error('Delete image failed', err);
      }
    };
    deleteImageById()
  }
  const onUploadedData = (data: any) => {
    setImages([...images, data]);
  }
  return (
    <div className={`absolute w-full h-full top-0`}>
      <Logo className={`mx-auto mt-14`} />
      <div className={`px-10 space-y-2 mt-14`}>
        <h3 className={`${h3} text-primary`}>Upload your dating pics</h3>
        <p className={`${body} text-secondary pb-5`}>And get personalized feedback</p>
        <div>
          <div className={`grid grid-cols-2 gap-5 w-full`}>
            {images.map((image, index) => (
              <ActionableImageWrapper
                key={`${image.id}-${image.s3_url}-${index}`}
                src={image.s3_url}
                alt={`${image.id}-${index}-image`}
                id={image.id}
                onDelete={onDeleteImage}
              />
            ))}
            { images.length < 4 &&
              <div className={`w-full h-full aspect-portrait block bg-black rounded-lg bg-opacity-10`}>
                { user?.id && <AddMore onUploadedData={onUploadedData} userId={user.id} />}
              </div>
            }
          </div>
        </div>
      </div>
      <div className={`absolute bottom-0 px-10 space-y-2 pb-10 w-full`}>
        <Link href="/upload/results">
          <Button
            size={`lg`}
            className={`w-full pointer-events-auto`}
          >
            Analyze it!
          </Button>
        </Link>
      </div>
    </div>
  );
}