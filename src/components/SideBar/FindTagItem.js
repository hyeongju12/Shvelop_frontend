import ListItemAvatar from "@mui/material/ListItemAvatar";
import {Badge} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

export default function TagItem() {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Badge badgeContent={4} color="secondary">
                    <LocalOfferIcon />
                </Badge>
            </ListItemAvatar>
            <ListItemText
                primary="#유형주"
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}
