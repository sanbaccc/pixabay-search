import * as React from "react";
import {
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageDisplay = ({ imageData }) => {
  const [view, setView] = React.useState(false);
  const [imgToOpen, setImgToOpen] = React.useState({});

  const handleClickOpen = (img) => {
    setView(true);
    setImgToOpen(img);
  };

  const handleClickClose = (e) => {
    setView(false);
  };

  return (
    <Container maxWidth={false}>
      <ImageList
        gap={5}
        sx={{
          mb: 5,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {imageData.map((img) => (
          <Card key={img.id}>
            <ImageListItem sx={{ height: "100% !important" }}>
              <img
                src={img.largeImageURL}
                alt={img.user}
                loading="lazy"
                style={{ cursor: "pointer" }}
                onClick={() => handleClickOpen(img)}
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>

      <Dialog
        open={view}
        TransitionComponent={Transition}
        modal={false}
        onClose={() => handleClickClose()}
      >
        <img
          src={imgToOpen.largeImageURL}
          alt=""
          loading="lazy"
          style={{ cursor: "pointer" }}
        />
        <ImageListItemBar
          title={imgToOpen.tags}
          subtitle={"user: " + imgToOpen.user}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${imgToOpen.tags}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </Dialog>
    </Container>
  );
};

export default ImageDisplay;
