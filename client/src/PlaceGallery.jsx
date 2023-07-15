import {React, useState} from 'react'

export const PlaceGallery = ({place}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
    if (showAllPhotos) {
        return (
          <div className=" absolute inset-0 bg-white min-h-screen">
            <div className="bg-black p-8 grid gap-4">
              <div>
                <h2 className="text-2xl text-white mr-36">Photo of {place.title}</h2>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close Photos
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photos, index) => (
                  <div key={index}>
                    <img src={`http://localhost:5000/api/uploads/` + photos} />
                  </div>
                ))}
            </div>
          </div>
        );
      }
  return (
    <>
        <div className="relative">
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] xl:grid-cols-[2fr_2fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={()=>setShowAllPhotos(true)}
                  className="aspect-square object-cover"
                  src={`http://localhost:5000/api/uploads/` + place.photos?.[0]}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={`http://localhost:5000/api/uploads/` + place.photos?.[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={`http://localhost:5000/api/uploads/` + place.photos?.[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 rounded-2xl shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
          Show more photos
        </button>
      </div>

    </>
  )
}
