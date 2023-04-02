import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string;
  revalidated?: boolean;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const slug = req.body.slug[0] ==="/" ? req.body.slug : '/'+req.body.slug;
    await res.revalidate(slug);
    return res.json({ revalidated: true,
        message: `Revalidated ${slug} page`
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ message: 'Error revalidating' });
  }
}