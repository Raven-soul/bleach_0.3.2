export function generateStaticParams() {
    const pages = ['Shinigami', 'Quincy', 'Arrankar', 'Fullbringer', 'Bount'];
    return pages.map((page) => ({ slug: page }));
}