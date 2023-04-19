import Head from 'next/head';

const HeadTag = () => (
    <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Almanac of Naval Ravikant: Chatbot</title>
        <meta name="title" content="Almanac of Naval Ravikant: Chatbot" />
        <meta name="description" content="Learn from one of the greatest thinkers of our time. Get access to Naval's wisdom and insights on wealth, happiness, and success." />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Almanac of Naval Ravikant: Chatbot" />
        <meta property="og:description" content="Learn from one of the greatest thinkers of our time. Get access to Naval's wisdom and insights on wealth, happiness, and success." />
        <meta property="og:image" content="https://navalmanac.progremir.dev/og-image.svg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Almanac of Naval Ravikant: Chatbot" />
        <meta property="twitter:description" content="Learn from one of the greatest thinkers of our time. Get access to Naval's wisdom and insights on wealth, happiness, and success." />
        <meta property="twitter:image" content="https://navalmanac.progremir.dev/og-image.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
);

export default HeadTag;