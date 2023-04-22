export const getLayout = async () => {
  return Promise.all([
    fetch(`${process.env.API_URL}globals/navigation`).then(res => res.json()),
    fetch(`${process.env.API_URL}globals/footer`).then(res => res.json())
  ]);
  
}