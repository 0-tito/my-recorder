import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FilledInput,
  Button,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { RecorderContext } from "../../store/recorder-context";
import saveAudioData from "../../ipfs/saveAudioData";

export default function OnRecordingCompleteModal({
  setOpen,
  open,
  blob,
  duration,
}) {
  const { setRecordings, recordings } = useContext(RecorderContext);
  let [name, setName] = useState("");
  
  async function handleSave() {
    const id = Math.random();
    try {
      const date = Date.now()
      const audios = await saveAudioData({ name, duration, id, date}, blob)
      setRecordings(audios);
      setOpen(false);
      setName("");
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      if (!recordings || recordings.length < 1) return;
      const existing = JSON.parse(localStorage.getItem(`recordings`)) || [];
      const merged = [...existing, ...recordings].filter(
        (item, index, self) => index === self.findIndex((r) => r.id === item.id)
      );

      localStorage.setItem("recordings", JSON.stringify(merged));
    }, [recordings]);

  function handleClose() {
    setOpen(false);
    setName("");
  }
  
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>record title</DialogTitle>
        <DialogContent>
          <FilledInput onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          {
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          }
          {name && (
            <Button onClick={handleSave} variant="outlined">
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
