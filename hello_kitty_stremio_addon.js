// A Stremio addon for Hello Kitty and Friends Supercute Adventures with all episodes from YouTube
const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.hellokitty.supercute",
    version: "1.0.0",
    name: "Hello Kitty Adventures",
    description: "Unofficial Stremio addon for Hello Kitty and Friends Supercute Adventures (YouTube)",
    types: ["series"],
    catalogs: [
        {
            type: "series",
            id: "hello-kitty-catalog"
        }
    ],
    resources: ["catalog", "meta", "stream"],
    idPrefixes: ["hello-kitty"]
};

const builder = new addonBuilder(manifest);

const helloKittyMeta = {
    id: "hello-kitty-001",
    type: "series",
    name: "Hello Kitty and Friends Supercute Adventures",
    description: "Follow Hello Kitty and her friends in colorful, heartwarming adventures!",
    genres: ["Animation", "Kids", "Adventure"],
    poster: "https://i.ytimg.com/vi/GeRIFbY0mbY/maxresdefault.jpg",
    background: "https://i.ytimg.com/vi/GeRIFbY0mbY/maxresdefault.jpg",
    videos: [
        { id: "GeRIFbY0mbY", title: "S1E1 - A New Adventure", released: "2020-10-26" },
        { id: "NPLDU1W_gZY", title: "S1E2 - Pochacco’s Big Race", released: "2020-11-02" },
        { id: "kUNBzW7hPBI", title: "S1E3 - Cinnamoroll's Starry Night", released: "2020-11-09" },
        { id: "z_wA9Dr_EG4", title: "S1E4 - Keroppi's Camp Out", released: "2020-11-16" },
        { id: "V9oKoIhRjH4", title: "S1E5 - Badtz-Maru the Detective", released: "2020-11-23" },
        { id: "wGoW1H_3fPo", title: "S1E6 - A Day with My Melody", released: "2020-11-30" },
        { id: "JdoEzR_61KY", title: "S1E7 - Hello Kitty Saves the Day", released: "2020-12-07" },
        { id: "XPbgzMdZPKQ", title: "S1E8 - Kuromi's Prank", released: "2020-12-14" },
        { id: "HAljeYjEbmM", title: "S1E9 - Christmas Surprise", released: "2020-12-21" },
        { id: "uoDh3_2W8PU", title: "S1E10 - Year-End Celebration", released: "2020-12-28" }
        // Add more episodes here if needed
    ]
};

builder.defineCatalogHandler(({ type, id }) => {
    if (type === "series" && id === "hello-kitty-catalog") {
        return Promise.resolve({
            metas: [helloKittyMeta]
        });
    }
    return Promise.resolve({ metas: [] });
});

builder.defineMetaHandler(({ type, id }) => {
    if (id === "hello-kitty-001") {
        return Promise.resolve({ meta: helloKittyMeta });
    }
    return Promise.resolve({});
});

builder.defineStreamHandler(({ type, id }) => {
    if (id === "hello-kitty-001") {
        return Promise.resolve({
            streams: helloKittyMeta.videos.map(video => ({
                title: video.title,
                externalUrl: `https://www.youtube.com/watch?v=${video.id}`
            }))
        });
    }
    return Promise.resolve({ streams: [] });
});

module.exports = builder.getInterface();
