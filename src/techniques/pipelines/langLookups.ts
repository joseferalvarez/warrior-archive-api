/**
 * Returns the project pipeline step that returns the language name and id
 * 
 * @param language 
 * @returns 
 */
const languageProject = (language: string) => {
    return {
        $project: {
            _id: 1,
            fallbackName: "$name",
            languageName: {
                $let: {
                    vars: {
                        filtered: {
                            $filter: {
                                input: "$languages",
                                as: "lang",
                                cond: {
                                    $eq: ["$$lang.language", language]
                                }
                            }
                        }
                    },
                    in: {
                        $cond: [
                            { $gt: [{ $size: "$$filtered" }, 0 ] },
                            { $arrayElemAt: [ "$$filtered.name", 0 ] },
                            "$name"
                        ]
                    }
                }
            }
        }
    }
}

/**
 * Returns the martial arts with the language selected names
 * 
 * @param language
 * @returns 
 */
const getMartialArtLangLookup = (language: string) => {
    return {
        $lookup: {
            from: "martialarts",
            let: {martialArtsIds: "$martialArts"},
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: ["$_id", "$$martialArtsIds"]
                        }
                    }
                },
                {...languageProject(language)}
            ],
            as: "martialArts"
        },
    };
};

/**
 * Returns the grades with the selected language names
 * 
 * @param language
 * @returns 
 */
const getGradesLangLookup = (language: string) => {
    return {
        $lookup: {
            from: "grades",
            let: { gradesIds: "$grade" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: ["$_id", "$$gradesIds"]
                        }
                    }
                },
                {...languageProject(language)}
            ],
            as: "grade"
        },
    }
}

/**
 * Returns the categories with the selected language names
 * 
 * @param language 
 * @returns 
 */
const getCategoriesLangLookup = (language: string) => {
    return {
        $lookup: {
            from: "categories",
            let: { categoryIds: "$category" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: ["$_id", "$$categoryIds"]
                        }
                    }
                },
                {...languageProject(language)}
            ],
            as: "category"
        }
    }
}

/**
 * Returns the tags with the selected language names
 * 
 * @param language 
 * @returns 
 */
const getTagsLangLookup = (language: string) => {
    return {
        $lookup: {
            from: "tags",
            let: { tagsIds: "$tags" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: ["$_id", "$$tagsIds"]
                        }
                    }
                },
                {...languageProject(language)}
            ],
            as: "tags"
        }
    }
}

const getVideosLangLookup = (language: string) => {
    return {
        $lookup: {
            from: "videos",
            let: { videosIds: "$videos"},
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: ["$_id", "$$videosIds"]
                        }
                    }
                },
                {...languageProject(language)}
            ],
            as: "videos"
        }
    }
}

export const LangLookups = {
    getMartialArtLangLookup,
    getGradesLangLookup,
    getCategoriesLangLookup,
    getTagsLangLookup,
    getVideosLangLookup
}