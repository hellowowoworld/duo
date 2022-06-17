import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TokenIcon from "@mui/icons-material/Token";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Carousel from "react-material-ui-carousel";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  InstapaperIcon,
  TwitterIcon,
  RedditIcon,
  WhatsappIcon,
} from "react-share";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Profile = ({ player }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <TokenIcon />
          </Avatar>
        }
        action={
          <IconButton
            aria-label="share"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <ShareIcon />
          </IconButton>
        }
        title={player.name.toUpperCase()}
        subheader={player.summonerName}
      />
      {open && (
        <Popup>
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <span> </span>
          <FacebookMessengerShareButton url={window.location.href}>
            <FacebookMessengerIcon size={32} round={true} />
          </FacebookMessengerShareButton>
          <span> </span>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <span> </span>
          <RedditShareButton url={window.location.href}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
          <span> </span>
          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </Popup>
      )}
      <Carousel autoPlay={false}>
        {player.photos.map((item, i) => {
          return (
            <CardMedia
              component="img"
              height="fit-content"
              src={item}
              alt="player photos"
              key={i}
            />
          );
        })}
      </Carousel>
      <CardContent>
        <Stack direction="row" spacing={1}>
          {player.positions.map((pos, i) => {
            return <Chip key={i} label={pos} />;
          })}
        </Stack>
        <Bio variant="body2" color="text.secondary">
          {player.bio}
        </Bio>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={1}>
          {player.personality
            .filter((item, i) => i <= 2)
            .map((type, i) => {
              return <Chip key={i} label={type} />;
            })}
        </Stack>
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
          <Stack direction="row" spacing={24}>
            <div>
              <Typography paragraph>Playstyle:</Typography>
              <Chip label={player.playstyle} />
            </div>
            <div>
              <Typography paragraph>Rank:</Typography>
              <Chip label={player.rank} />
            </div>
          </Stack>
          <br />
          <Typography paragraph>Most Played:</Typography>
          <Stack direction="row" spacing={1}>
            {player.summonerInfo &&
              player.summonerInfo.mostPlayed.map((champ, i) => {
                return <Chip key={i} label={champ.champion} />;
              })}
          </Stack>
          <br />
          <Typography paragraph>Schedule:</Typography>
          <Stack direction="row" spacing={1}>
            {player.schedule.map((pos, i) => {
              return <Chip key={i} label={pos} />;
            })}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Profile;

const Bio = styled(Typography)`
  padding: 1em 0.25em;
`;

const Popup = styled(Stack)`
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 50px;
  border-radius: 10px;
  padding: 0.5em;
  background-color: rgba(0, 0, 0, 0.5);
`;
