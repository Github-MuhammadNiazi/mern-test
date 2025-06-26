router.get('/posts', async (req, res) => {
    await getSortedPosts(req, res);
    console.log('Done.');
});
