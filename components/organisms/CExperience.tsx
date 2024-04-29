import LContainer from '@/components/templates/LContainer'

interface IExperience {
  header: string;
  positions: [
    {
      id: string;
      position: string;
      description: string;
    }
  ];
}

const getExperienceData = async () => {
  const res = await fetch(`${process.env.API_URL}globals/experience`, {
    next: {
      tags: ['experience'],
    }
  });
  const data: IExperience= await res.json();
  return data;
};

const CExperience = async () => {
  const {header, positions} = await getExperienceData()
  return (
    <section className="my-16 o-container o-container--lg">
          <LContainer>
            <h1 className="text-h1 text-center mb-16 font-bold">
              {header}
            </h1>
            <ul>
              {positions?.map((item) => (
                <li className="mb-10" key={item.id}>
                  <strong>{item.position}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </LContainer>
        </section>
  )
}

export default CExperience