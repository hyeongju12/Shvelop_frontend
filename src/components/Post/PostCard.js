import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Divider, styled} from "@mui/material";
import PostCardHeader from "./PostCardHeader";
import './PostCard.scss'
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ChipsArray from "./PostTag";
import {red} from "@mui/material/colors";
import Button from "@mui/material/Button";
import Comment from "../Comment/CommentList";
import InputComment from "../Comment/InputComment";
import {useState} from "react";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard({post, handleLike}) {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => { setExpanded(!expanded); };
    const {id, title, content, cover_img, category, is_like, author} = post

    return (
        <Card sx={{
            maxWidth: 650,
            marginLeft: 2,
            marginInline: 2,
            marginBottom : 2,
            border: '1px solid gray'
        }} key={id}>
            <PostCardHeader post={post}/>
            <Divider/>
            {
                cover_img !== null &&
                <CardMedia
                component="img"
                alt="Cover Image"
                height="300"
                image={cover_img}
                />
            }
            {
                cover_img === null &&
                <Typography variant="h6" paragraph marginLeft={2} marginTop={2} marginBottom={2}>
                    {content}
                </Typography>
            }

            <Divider/>
            <ChipsArray post={post}/>
            <CardActions disableSpacing>
                <Button aria-label="add to favorites" sx={{marginLeft: -2}}>
                    {!is_like &&
                        <FavoriteIcon color="disabled" onClick={() => handleLike({post, isLike: true})}/>
                    }
                    {is_like &&
                        <FavoriteIcon sx={{ color: red[500] }} onClick={() => handleLike({post, isLike: false})}/>
                    }
                </Button>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph marginBottom={1}>작성자 : {author.username} / 카테고리 : {category}</Typography>
                    <Divider/>
                    <Typography marginTop={2} variant="h5" paragraph>
                       title : {title}
                    </Typography>
                    <Divider/>
                    {
                        cover_img !== null &&
                        <img src={cover_img} alt="cover_img" style={{height: '40%', width: '50%',marginTop: 3.5, marginLeft: 150, border : "1px solid lightgray"}}/>
                    }
                    {
                        cover_img !== null &&
                        <Divider/>
                    }
                    <h2>Content</h2>
                    <Typography variant="body1" paragraph marginTop={1} marginBottom={1}>
                        {content}
                    </Typography>
                    <Divider/>
                    <a href={post.attached_file} target='_blank' without="true" rel="noreferrer" download>파일 다운로드</a>
                    <Divider/>
                    <h3>Comment</h3>
                        <Comment post={post}/>
                    <InputComment post={post}/>
                </CardContent>
            </Collapse>
        </Card>
    );
}
