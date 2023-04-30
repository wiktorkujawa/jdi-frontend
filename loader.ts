interface Loader {
  src: string;
  width: string | number;
  quality?: number;
}
export default function cloudinaryLoader({ src, width, quality }: Loader) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `${process.env.CLOUDINARY_URL}${params.join(',')}/${src}`
}