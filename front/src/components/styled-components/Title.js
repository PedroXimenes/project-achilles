import styled from "styled-components";
import { Theme } from "../../config";
import { Row, Col, Grid } from "react-flexbox-grid";
import { ArrowImg, CtrlImg } from "./Logo";
export const Title = () => {
  return (
    <Grid>
      <Row>
        <TitleWrapper>
          <Col md={6}>
            <StyledTitle>ACHILLES</StyledTitle>
          </Col>
          <Col md={6}>
            <CtrlImg />
            <ArrowImg />
          </Col>
        </TitleWrapper>
      </Row>
    </Grid>
  );
};

const TitleWrapper = styled.div`
  position: relative;
  top: -3rem;
  left: -20rem;
`;

const StyledTitle = styled.h1`
  position: absolute;
  font-size: 6.25rem;

  left: 30rem;
  top: 23rem;

  display: flex;
  align-items: center;
  text-align: center;

  color: ${Theme.darkBlue};
`;
