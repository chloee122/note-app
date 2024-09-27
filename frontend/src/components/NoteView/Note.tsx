import { useRef } from "react";
import {
  NoteBody,
  NoteContent,
  NoteTitle,
  NoteWrapper,
} from "../styles/Note.styled";

interface NoteProps {
  setNoteScrolled: (arg: boolean) => void;
  setShouldShowTitleOnToolBar: (arg: boolean) => void;
}

function Note({ setNoteScrolled, setShouldShowTitleOnToolBar }: NoteProps) {
  const noteRef = useRef<HTMLDivElement>(null);
  const noteHeadingRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollPosition = noteRef.current?.scrollTop || 0;
    setNoteScrolled(scrollPosition > 0);

    const noteHeadingHeight = noteHeadingRef.current?.clientHeight || 0;
    setShouldShowTitleOnToolBar(scrollPosition > noteHeadingHeight);
  };

  return (
    <NoteWrapper ref={noteRef} onScroll={handleScroll}>
      <NoteContent>
        <NoteTitle ref={noteHeadingRef}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
          sapien at diam laoreet sollicitudin.
        </NoteTitle>
        <NoteBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
          sapien at diam laoreet sollicitudin. Integer eget luctus sapien, at
          gravida nisl. Maecenas a urna ullamcorper, sollicitudin purus quis,
          sodales odio. Curabitur et orci vulputate, sodales velit volutpat,
          auctor nisl.
          <br />
          Nullam eget semper neque, a scelerisque lacus. Maecenas consectetur id
          sem quis cursus. Pellentesque ut lacus sed elit tristique porttitor.
          Aliquam nibh urna, fermentum ac arcu auctor, mollis rhoncus libero.
          <br />
          Morbi sed vestibulum ex. Phasellus vitae pellentesque turpis. Vivamus
          efficitur ante justo, eu pellentesque nisl mollis eget. Duis at
          pulvinar tortor. Sed quis iaculis mi. Suspendisse nisi neque, congue
          in tincidunt non, semper ut sapien. Nam venenatis libero ac arcu
          ultricies, id
          <br />
          consectetur dolor fermentum. Curabitur dictum at ligula sed finibus.
          Proin dictum velit ac purus scelerisque gravida. Aliquam feugiat nec
          sapien a finibus. Quisque et tincidunt quam, in dictum enim. Cras at
          <br />
          turpis fringilla, auctor neque ac, fermentum ipsum. Donec orci elit,
          facilisis et molestie vulputate, ornare in elit. Sed sed gravida
          magna. Mauris a nisi massa. Suspendisse imperdiet vestibulum erat, sit
          amet sollicitudin eros auctor ac. Donec et tellus nunc. Maecenas dui
          arcu, iaculis a lectus sit amet, consequat consectetur lorem.
          <br />
          Aliquam erat volutpat. Duis et massa elit. Morbi augue nisl, aliquet
          sit amet ornare ac, tempus sit amet eros. Pellentesque et felis vitae
          ex semper condimentum. Sed ac egestas dui. Aenean consequat nisi
          libero, vel elementum justo imperdiet vitae. Praesent sit amet
          ultricies libero, eget porttitor est. Nunc commodo ipsum sem, eu
          pulvinar nisl vehicula sed.
          <br />
          Phasellus consequat, sem id pellentesque viverra, eros dui posuere
          libero, in tincidunt sapien tortor eu ligula. Ut non laoreet sem. Sed
          a ligula nulla. In quis tempor diam. Aenean gravida ex et massa
          pretium placerat.
          <br />
          Suspendisse nec quam luctus, fermentum nisl eget, ornare lorem.
          Maecenas tincidunt facilisis augue, a volutpat diam malesuada sit
          amet. <br />
          Ut dignissim lacinia tortor. Donec at condimentum sem. Pellentesque
          vitae purus nec elit accumsan interdum. Suspendisse sem nisl, volutpat
          nec tincidunt sed, lobortis vel nunc. <br /> Sed tempor eros ipsum,
          viverra ultrices metus luctus vel. Praesent malesuada suscipit velit,
          dapibus feugiat urna pharetra nec. <br /> Sed dictum congue est, sit
          amet laoreet magna fermentum ut. Vestibulum quis mauris feugiat,
          euismod augue molestie, maximus lectus.
        </NoteBody>
      </NoteContent>
    </NoteWrapper>
  );
}

export default Note;
