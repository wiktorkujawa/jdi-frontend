import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.MY_SECRET_TOKEN) {
    return new Response(`Invalid token`, {
      status: 401
    })
  }

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    const { tag }: { tag: string } = await req.json();
    if(tag) {
      await revalidateTag(tag);
      return new Response(`Revalidated ${tag}`, {
        status: 200
      })
    }
    else {
      return new Response('Missing tag', {
        status: 404
      })
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return new Response('Error revalidating', {
      status: 500
    })
  }
}