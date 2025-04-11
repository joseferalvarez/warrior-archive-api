const martialArtLookup = {
    $lookup: {
        from: "martialarts",
        localField: "martialArts",
        foreignField: "_id",
        as: "martialArts"
    },
};

const gradesLookup = {
    $lookup: {
        from: "grades",
        localField: "grade",
        foreignField: "_id",
        as: "grade"
    }
};

const categoriesLookup = {
    $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category"
    }
};

const tagsLookup = {
    $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags"
    }
}

const videosLookup = {
    $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos"
    }
}

export const Lookups = {
    martialArtLookup,
    gradesLookup,
    categoriesLookup,
    tagsLookup,
    videosLookup
};