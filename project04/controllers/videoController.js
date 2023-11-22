exports.getVideoList = (req, res) => {
    // Logic to fetch video list data from file storage
    res.render('video/videoList', { videos: fetchedVideoData });
};

exports.getVideoDetails = (req, res) => {
    // Logic to fetch video details data from file storage
    res.render('video/videoDetail', { video: fetchedVideoDetails });
};
