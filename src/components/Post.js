function Post({post}) {
    const { title, content, cover_img, attached_file} = post
    return (
        <div>
            {title}, {attached_file}
            <img src={cover_img} alt={content} style={{width : "100px"}}/>
        </div>
    )
}

export default Post