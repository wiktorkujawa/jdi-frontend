interface Loader {
  src: string;
  width: string | number;
  quality?: number;
}
export default function cloudinaryLoader({ src, width, quality }: Loader) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/dlznycnmy/image/upload/${params.join(',')}/${src}`
}