import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main2.svg";
import Particle from "../Particle";
import Type from "./Type";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 className="heading-name">
                Bruno
                <strong className="main-name"> Bento</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
          <Row>
          <Col md={3} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
          <Col md={1} >

          </Col>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              <span className="purple"> SOBRE </span>
            </h1>
            <p className="home-about-body">
                Sou um Desenvolvedor com experiência em otimização e depuração de aplicações. 
              <br />
              <br />Desenvolvi aplicações em
              <i>
                <b className="purple"> C#, Java, JavaScript, TypeScript e Go. </b>
              </i>
              <br />
              <br />
              Sempre curioso e em busca de novos conhecimentos para me manter atualizado no campo da tecnologia.  &nbsp;
              <br />
              <br />
              Atualmente estou me aperfeiçoando em 
               <b className="purple"> UI/UX</b> e
              <i>
                <b className="purple">
                  {" "}
                   Bibliotecas e Frameworks com Javascript
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js e Next.js</b>
              </i>
            </p>
          </Col>
          
        </Row>

        </Container>
      </Container>
    </section>
  );
}

export default Home;
