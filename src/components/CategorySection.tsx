import { FC } from "react";
import { Carousel } from "./Carousel/Carousel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const Section = styled("section")(() => ({
  display: "flex",
  flexDirection: "column",
}));

const SectionHeaderWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
}));

type CategorySection = {
  category: string;
  title: string;
};

export const CategorySection: FC<CategorySection> = ({ category, title }) => {
  return (
    <Section>
      <SectionHeaderWrapper>
        <Typography variant="h5" aria-label={title} sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </SectionHeaderWrapper>
      <Carousel category={category} />
    </Section>
  );
};
