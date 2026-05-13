export function generateStaticParams() {
    const pages = ['Shinigami', 'Quincy', 'Arrankar', 'Fullbringer', 'Bount'];
    return pages.map((page) => ({ slug: page }));
}

export default async function Page({ params }) {
    const { slug } = await params
//-----------------------------------------------------------------

    return (
        <div className="row-2">            
        </div>
    )
}