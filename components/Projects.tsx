import React, { useState } from 'react';
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon, WrenchIcon } from './icons/Icons';
import ProjectModal from './ProjectModal';

// Map project titles to local image fallbacks
const projectImageFallbacks: Record<string, string> = {
  'Sync To Sheet': '/Images/sync_to_sheet.png',
  'Skillioz Platform': '/Images/skillioz_logo.png',
};

// Image component with error handling and fallback
const ProjectImage: React.FC<{ src: string; alt: string; className?: string; projectTitle?: string }> = ({ src, alt, className, projectTitle }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0) {
      // First error: try local fallback if available
      setErrorCount(1);
      if (projectTitle && projectImageFallbacks[projectTitle]) {
        setImgSrc(projectImageFallbacks[projectTitle]);
      } else {
        // Second error: use placeholder
        setImgSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%239ca3af"%3E%3F%3C/text%3E%3C/svg%3E');
      }
    } else if (errorCount === 1) {
      // Second error: use placeholder
      setErrorCount(2);
      setImgSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%239ca3af"%3E%3F%3C/text%3E%3C/svg%3E');
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

const projectsData: Project[] = [
  {
    title: 'Sync To Sheet',
    description: 'A Stripe-to-Google Sheets integration for real-time synchronization of transactions and customer data, with an intuitive UI for non-technical users.',
    image: 'https://d1wqzb5bdbcre6.cloudfront.net/0342244546c90f80a7e1bf4d01a48fbcc19cb492f4fe26ddd3f0b96f3873779d/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387855457058547a6c4554574e56595464755354644e66475a7358327870646d566655315a36576e526b4f553969574570315446646a52326c734e54564a55334a4b303070326a5958413056/636c69656e743d4150505f4d41524b4554504c414345',
    tags: ['Stripe API', 'Google Sheets API', 'React', 'Node.js', 'OAuth'],
    details: [
        "Securely authenticated with Stripe and Google APIs using OAuth 2.0.",
        "Implemented webhooks for real-time data updates from Stripe events.",
        "Designed a user-friendly dashboard for mapping fields and managing sync settings.",
        "Ensured data integrity and provided detailed logging for sync history and error handling."
    ],
    liveLink: 'https://marketplace.stripe.com/apps/sync-to-sheets',
  },
  {
    title: 'Skillioz Platform',
    description: 'A resume parsing platform that extracts structured data and matches it with job descriptions, featuring an analytics dashboard and an AI-powered copilot.',
    image: 'data:image/jpeg;base64,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',
    tags: ['React', 'Node.js', 'MongoDB', 'AI/RAG', 'AWS', 'Parallel Processing'],
     details: [
        "Built a scalable backend to handle parallel processing of large volumes of resumes for efficient data extraction.",
        "Developed a comprehensive RESTful API to support the frontend dashboard and analytics features.",
        "Integrated a RAG (Retrieval-Augmented Generation) model to provide AI-driven recommendations and parsing.",
        "Created an interactive chatbot to improve user onboarding and provide instant support."
    ],
    liveLink: 'https://www.skillioz.ai',
  },
  {
    title: 'Foodarna App Ecosystem',
    description: 'A community-based food app ecosystem connecting home chefs and food lovers, with separate apps for customer ordering and driver delivery/routing.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABIFBMVEX////ONCj+///MHwrONCntzMnUb2jRNSjNLR/NNSjNMSPPMCP+//3SNCfz3dzJGwDUT0TSUEjNJRXLJRnowbv9+fjjpqTPPjTIzs6zFgTq7u6dlJPbdnGQiIrTMSPBJBbcioa9w8TQRT3gnpmOAADa3995AACnDwCFAACus7P26ebm6+yhpKXkr6qZAAD28O/UYFvakozy19TIAACDFxCCaWeIVVOKSESJODOPJx6YIBqnFAmZHhGAeHlyQUCAHxp5VVWGYmKChYd8PDlhEg2BKSSCdXNnV1ZsT05rRUZnNDGYnZ5vIR3Xfnhxa2ptV1pdJiRwKylgNzdwEw6JeHiKIBpwNzbPWU3mt7fUZl2AOTh8BABqAABtJCF3SkmJKiV11eEgAAATc0lEQVR4nO1dCX+aSB/GATPIIXHwTgIeMSYeMZq0u/vmaDfbbo/U3m307bb7/b/FO8CgaBQGHEzye332+ClBhof/PRcct8EGG2ywwQYbbLDBBv8/AOV2o9EoEuCP7TK473tiBNCoHu09efrb73/85/y8RHB+fvHH7789fbLXqTaU+77DFQCKR5dXzy7OdV2UDVlVoQeqig+Jun5+8e37Zaf4CGmWizvPD45Nw1ChKgiJZRAEVVUN8/jg+V61fN/3TA/QuPnzW9PE5JYymwPELJvf/twpPgrbLF7/dWGKWCVp6RFpWizP/3tZvO/79wdo7L041ullt0CWzS97jQcryfLR830T01tudoFIYZLi8VWnfd9cFqGx97Ikq9HJeSRplP79+8Fpa/HVPtbOFaQ3C1W8eF29b04egOqbY4OJ+Lwkm2+PHopBVn81jcjOZTmg0bx6EByLb87lGPgl7ADS/HXvutr4cByH/FxgOb5u3Ce/8t6hDFPxEUykBCgfXt5fPnf0l6kyc59LoZrvOvfDr/z+PHr2EgaCev76PlKAo3901gFiKVTj4GbdXrX9pLkGBfVwLK3Z41TfmWsTIIH87Gh9/JTr/fVY4AzU4/fr0VTAtV+vXYA2oPl5PZpafCeyS7EJRIQhBp2lGl/WkeIcncmM6UFdG+ezo/xY0wPOFIz9m9gJXh+z1lAJDXscAPjf1hAFmbdaeh8vP/C+xJ7gaHr5kRhEEZof4kziyq9M1j5UQknO4yKzKOgH0HwTH8X2m8BHHIWgBwrXD6Yofowrh2t/lFgTlMXkXCNKQQr8lfEinqjR/s7aiSYkcXCnmSQfXI4Zn+Kg2L4KjFdhIS8gyHHDQD3Fv4yBYvutyLrUlROLCHI9Cj3FisraFsufKZoNBUEupBc2BbI8hbkbH9l6VPBKZB0H5UJrcVsK2BUpskLxiiVF8J51HBSWEsTo8RQMofmaYalxbapMjVAQxO3lBDluxFNcBJrsErgO61w0ZWz3/BoEWzR+G5b2GBEsHrLusND9CXJcmip5UvfZFFPln6ydjJ7p+ZuQwuUpgiKm+A+LsAheM470KXQSPDEBZKgSKJVFzLhm60ZTgn6bC3aCIE3jT3EWvrq3qTL2MgI6yVE1HFxk2BSbq/aHl78wHXhJCWhXoQtjuW0aPU2pZyua4iu2RijwW5QEcZFBJcSE/GalwN85Z9qtBvldhaO+oQqdnprXKxBsnLE1Qn5ILUGMnEiV7auHK+jpK4MlP8hXwilUUqO6rhFdT4+aTHU0LEGO26XyAikzaidq+RNTHUWhCYKWQKenzyKWw3smQwlCrR5Bl7o0RUYiIUWL+41DhpHQIhiBIRhT6al6HGkK1QeW/RZanT5KeNGiC4rq5wjXZpqu8d1o7g5weSo9Vc8jDJ9+ZhcpIN+NxM/GLVUfn/GJLtv14KjElGD0zGpAY4kCLIXNwMEVMxFCfQUJcrRFhhpWiEfnjBxpCvLZlQhSjWRYnTbhhAh+sRqjkPnkip1+YKBRPG1BfRFqSUP1mBFBSVxRgpY/raDg1AMmzFBCfG2wSWckcVUJWujVaEzGeBuiqeI+GyuU9QGTfungkeGENak4RN/iezaOdNHwYDTsBs3SSFi9Uk+or9f+xkSEcoEVQa6nU9wRvKAuhTsmE4KpNMdoxZbCjSiKYWjuUF4P/GKhpLLUYjg2RDWSob6jbLF4zEBJxVqLlQRtpCmmy0NaX7PHQEkxwSj1oA+GFM7GeEV1KcCg88KSIOOpkjTdp+oBldpUmytHe2v0jPWy0BzFZB5Il9dcrtzNrd8GDA9GAOCopmh8oFGdL6sqaRwEMW4pigH5X4rRtuKqdRPV6FkE1ChkCEsU3vSGJn3wAaIfewkDkEvQ3Jf+NfhSK4Z7tBWPBMGAqtSX/wpsvf3HSmaIxqF7hCjRp4iHVs9pYG5aLa2ipGioMA70Lqhmu1HFi5USGjSMa0UEoBtMTAiBJRR4uoIZhhseDMOP69IRpMi+y9+imyE/ZJ2pTdClG0nEgPsBhlhsRjZDvs/FYIOK5UbHVFNPHIalgP79nchmiAnGgt7ohA+TRxoBk92+RjVDLR6C6X4heLXQLMM3vhcE3yMyjDq45I/kmA+bYQnqM987AT+iORqUZ0+vla+FUk8C1b8/qhGtA4NnT3AwlFCkIdqA5PsoUkZzutrg0l0oo1sUeXmO7pvVdKiSvzmglYcmvACg1UfR+SUS4qXf5S8jOBq2Nqgkt3ja/GUJwz/9rv86PEP5hKEXbeUzUbzLDIynfi18Cs9wdnXdShgMxWjeZQby7z49GeBZ6GAh19iwA7nRrcZk8Z/6h88MqXL4uYh6hQE7O3fhGc3f8Q2IjYvQD9GzxjU6w+RY1JnNT4JNH4bF89AyXHEeggJAr17A3oXdmhxY8pkCdg8MB0PEwLvMMvRJaqrhVx6g6PkMFh/OXfSwu/MFwq9CjMBQ3IrMMF0RUBxbTPkzDD0oAxMRug+BwuWyY42dd5mB31BwNUKFH0lNW/VIlREd/Bh2IvToS7XQQkxGrYzo4M8wwgVRnZoaAIDLdTMh+yXCwo/hUaR+KOS3HHSOYrqio7g3t/G1w0iTSsUtml5EBQf37BgHh1V2/6SCv6eJ1Lo2v/XDQsTqXTwQfKNFtGEZaVsJGLUHuLDV4vQuHvgyjDj+K/D55WpqDWX0uriwXdvmZzEwTEjCcmcDsHcpIOabhvjAL/OOUD05QJWFhb61N1L2RI8pd1mGpg/DCBWwA0FbOA0RtOqCtk7xWfCdogiWjq3JOsL/LM2TBfl2ToY4uIPkUEeSXfgJLuIhNQPfXowlPVEyj04q9Xy9crJc3e5kNj0rdyGMIK8RrEGgvj1R3JtFDPVM1k09h8sDGuqCaeC3c5cJG6lgi9T6O9V2EKvB+M0v//h7AUPUBy78JghCbehOhbIrI8+fMENufQz9e4Rv7jJAfef2uACGWNa1/qCX6w36NX5WGaXaOmUo+k4aOpov8iEujpx7U+q7/YGPlmJIOhIKBaye8w4l1e2tj6Huu2b2zvRgQc+Tx7+riYgPdBRw4RxJqOW5tTH0H10r31k3yg8cHe1ZWxoKUTd+RutjCC9815OC+Z1aUnrLYZimnu+xCOtkeOZfyj2ZdaaygcitpTVZcgO+LOoI6fP7AUDJPjqXFeBUAZf0dxhK1slocrIsSzas7xI+qkre7/iyskd5JKt5fGgxQ/W7L8G52SbSdibjMqxlMhnbg4hoe7fe7fa3ajO9ESh1W8l385WTFJImnkZGt5Vuflg7nWWoo9puv9u1Ugi7pLLacSBI6HZ3t1CbfIeosJvv9k/c0ksQUW1sNzQueBqawvAdIJ2vEPkksEpzCwr+oJzIOD3ZSjrxH+SSY3dnNcFI5N3lFa18wY0p+razsCtXr3sYymiYdFOIVj0lWsZuXR+3kMvoWfyLSpazvyvcLd93omzSmbkn8eMs2aAI9LqFBcEraOpee99riJghcGM1sBnKYtYN/xZ1sl5eQCc9bnKY623ZO60K+jjnhtLelKG4nbaOuI+uVZMsd+YQyhWy1lDGlOF21r1qyxp6kwrJ6S9xQyd3zBoGLVwHv3kNkbcqBnI1C2NRSpNb5Zx2k/aQ34SKe/auNVAt13rurUye05YhFXKTh2b/v4Vchw1AbmgfxwzJL7vchI41eU9Me35pnX9narR6ENRn9NUreLGSr7uPq57P52ta1mkxV8/biYBityttO1kBzkaTpPEMjvp6kjyGXG5CBzPcdu65vutG2r4unyRJK0mHYWYiOpcgbhM/TNHy7Aro7lbII51ftycYvjmbhdk13CLSXE9zajnKMWltqGkV8odb2eqJsj/38OmOjLkBn3BP5lontSznYWg/jt6pqBFJpfkUcs91/tfXauQ7rqArrgGMRcKQ43WNPHllvnMkeHUXLvO9v4H6JFrgb9pgoliC5pgDl+VVcjsgj7DUJwbHj8jhXSTraS9Dq/bv8VbBZR/LFewOScLIZoi2XcmNNJeMNQ/aZsgp4vTxze0JpvoV+MQQ/5qJ+TMM5QzRmSyfEPgkeYqCG+zArZySya1xI14nitTDDncaDzHDXg4DPySdONhcRp4yxC46x00Z4gchbpHf4gcop63f5sSEPHYvOMfwZfCCi9kpNTMMxSG5jzqyR2Scb1unxE9wouXseq6YSUHBDbSE4I34ODnHSCF0epeh1WlcK2ydiO6DytoMFZdhwv5tAVvDrWOh81vY0Kwjrc7MoZ1h6D50rqInXB3DynNKDEWxQodIDLFXcMUy4lMzDBNQlZGG43iS/C63PZXhSBMlWZSkJQxTOHNCmr5Vz7bICXMMTYr9MZQDdRlDV2x2qa8T8wB5ntRX9qacuuPP8W1XyD1Y3nY2a9NT/bTiRpxZLSW7CS5jiK+kVwbKNC7NMVT/Q7NQdiY1nWWY9dynTnyKxdA1OA9DcOs6CCsr8NhhQkL1nCfih2IIEfas9hDIQobQ+EVB0NodikaGyJVhXVsgQy5Xm8hwhqEIZRJblFH2rh36M4TkDnAS5z6/WRn6V78uyt5ZtF6GAjY9p62KxdAJ2Dg8n7bIOTg7hpAYSE9yXSBm6LVDu8fKysJuF3maOYZglqGrN8qWdsst8DRwn27DqK/iYoaTqAVs08qS8JxxIzdXsHwpEWia3yZHkzO+VHd6RRRljBZEiwCGmvP4uAovjhcxDJjjPYHXm84whBIJBUksFo2oY4ufBBFsnvIJOb+OkGue2HymER8R0eJAhxlyoRjyKSJCQZ3EQy9DgXZ/k/J/p3vOzuY0riHmJAhTwKWSQIT4SJsaXE3m3SpkqJ3WJ1kbGhKGGuTznmjhui3CMLOQIVELRYT67oThNAVTf9DuZno9eS6qNy/FxaFEHGD+9HREJKRDq8PR/qzcnqZI4dD15KW5/Ajnks7n4SnhomS0Ws79yPPuufVTO/NHNZfhqYpchayfpkjH5tap5Nr+rjZl6N+P6EXjgvgaWKsPSFO5bh7n2LqrkIO0m9FYzxDZGRwuIpITK0w4M0/tb7Z/J+dnXUPtJRW3COr1K26MaeUtLyYO3WZbdThMkgqqV+fdciw5KUdz0+oCntPvaeZOFZZPwAROlz7qk/yfPH57E3zMcULGIWiXbeqkPsRe3+0w7Z1m3euBXs65dW7k1ofWPEx++mwsBUh5Pifqk2o1516wNdkMzPhFP5XX9TXWiJJ9GesfZ9ACbbnSs5jckgcoifmJRDjQTTkdR2LG1aVkImddibMY1shB0BuTshIzdP5q/Wcx5JPOZ4uVlHTGIa3fFkgsVTgF34ZzeMKQ2s/Y+KgSg09OMXB6kUS0m+zZ7WV3p11REBXqA0sVlXS3NhmwF8V+S+G4Xp8XsuQqWSSLeWu/hdyoUHAv3c9Pm7EikV6ffM0Kns845e6nrYedvD0dTS7o+ox3YXZN7pQc+5V4D9w6ReQ1IbMtabMzK3BGjAqZGpqZkACRBjMFzQqf5CLIPihlajySoHtlHU1bsW9Yn36F3s/4L5q4XUPY6yHv+RbC7dRa/t13MDiVkKUFJ0BJvjvAiA8uuMIqb53FF1zQi6gehNv4+obJFjVrhGCG3IK+/JPtuwJih3EWdu/ym/t5t1pkhBUh9sTvHhNDGGUb2s5KC/PXjfAixEJ8y3Qj6HihvoiyMql6HOuLcFki/N6ejhCfyI+EoWBcRVtcxnpH9tig7kd91/z14wj70AwYFF0O8PFRCNH4Gf1FJdX9R0BRba7yGt1Lcy3TCVeCSLcN3RKUrxht1RobBPXnau+YKz5wPYXq8arvfLp52Mnbam8osaBwH9Y3yT4CVnh7BwHg2p+Yvi2ILdQDFi/tesCmqO6zed96p/lAKcJzVu+wvmT+nmMmYPgCRPCB+ZuOGQAan9nt71f+/PAcqsD2dbLtCFuCxAtB/sL2lcCNlfdtZQz1R9SacBmqPx6SFAXjkM0LOmconj0cilCNgSCO/A+mU0Ng9YrVeVQPHwjFOFTUAuCqXx5EtagexEPQQuPTOhZjB8D4wtqLetF+KzJ9YWB4qOIntnFwHuU39zsmBc3PLDOZRQDvm/c4sqiWXrF8Z/wS3Oyve+3ylODxdVz7+M6g+u5eSg1BEM/YFLzBaL8usX7bejCgar5txLYV8x1cH687hRPU48u10bNQ/WQy36PLD9B8uS4NdVG+ZPxKcl+ozQ9xB4kFqL4Q12SNqvjPugXoAFxexLHd2hwEKB+/X0MQXIzi82bs3cVq6Sq+RDsYytHPOLM4AULzS2etLnQBx52D2DgKUPxxfW8KOkX5+psZQ90oJFTz7O978KCL0N57Zqqs7VE1Dy/jrZNCob3zj8kwy4EJwzzYeyDyc6F0rs5FRoJUxfPvNw/A/u6g+Pe/pVXm/toQoGGePamyfmsbK7Q7zw9NQ404fyOVSGF6+786D0w9ZwHaN2/3MckI6gpVWd//vtO45/BHg3bnw8umiY2SliY+TzXM5r/Pbx6Q8wxAubjz5zPM0gimCaEhms1vT/eKD9G3+KJc7Hz9/uO4pBuGqqoJQfCQhTAFVagamNzx4aevO4+PnQugFI9u3l+9/HZxXjJ1D1Dp/OLs5fcnO0dF8AgMLxjlRrFa7RztEXQ6R9Vi49HKbYMNNthggw022GCDDTa4g/8B80vuySU+Nh4AAAAASUVORK5CYII=',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Real-time Tracking', 'Sockets'],
    details: [
        "Developed two separate React Native applications from scratch for customers and delivery drivers.",
        "Implemented real-time geolocation tracking for orders using WebSockets for live updates.",
        "Integrated a secure payment gateway (Stripe) for seamless order processing.",
        "Designed and managed the MongoDB database schema for users, orders, and restaurants."
    ],
  },
  {
    title: 'express template generator',
    description: 'Express Template Generator is a CLI tool designed to quickly scaffold out the foundation of an Express.js application',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAALVBMVEXLAADKAADMERHVSkrURkb////eeXnghITfgIDstrbFAADJAADhiorPJCTVSUliGH6+AAAAUklEQVR4AWMgETAKQoEAmKvsAgVGYEnTUCgIFmBgYmAQgOtiAHERACdXSNkBmevi/AGZyxrwAU3v4OJ+gLACGP7DA8dZgOGeixEi6ECUAIlhDgBoOA7wXH0RDQAAAABJRU5ErkJggg==',
    tags: ['Node.js','npm package','Express', 'Template Engine', 'CLI'],
    details: [
      "Created an npm package for generating Express.js templates with a user-friendly CLI.",
      "Express Template Generator is a CLI tool designed to quickly scaffold out the foundation of an Express.js application.",
      "It helps developers get started with building web applications and APIs by generating boilerplate code.",
      "pre-configured with essential features like routing, middleware, and template engines.",
      "This package currently supports EJS templates and provides a clean, modular folder structure with built-in utilities for logging, pagination, and structured responses."
    ],
    liveLink: 'https://www.npmjs.com/package/express-template-generator',
  },
  {
    title: 'Latency Js',
    description: 'Latency Js is a library for measuring the latency of a API Application.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAALVBMVEXLAADKAADMERHVSkrURkb////eeXnghITfgIDstrbFAADJAADhiorPJCTVSUliGH6+AAAAUklEQVR4AWMgETAKQoEAmKvsAgVGYEnTUCgIFmBgYmAQgOtiAHERACdXSNkBmevi/AGZyxrwAU3v4OJ+gLACGP7DA8dZgOGeixEi6ECUAIlhDgBoOA7wXH0RDQAAAABJRU5ErkJggg==',
    tags: ['Node.js', 'npm package', 'Latency', 'API', 'Performance'],
    details: [
      "🔍 Track API Response Times: Monitor how long your API endpoints take to respond",
      "⚙️ Customizable Thresholds: Set different thresholds for different HTTP methods",
      "📝 Flexible Logging: Configure log levels, file paths, and console output",
      "🎨 Colored Logs: Visual distinction between different log levels",
      "🔌 Easy Integration: Simple setup with Express.js applications",
    ],
    liveLink: 'https://www.npmjs.com/package/latencyjs',
  }
];

const ProjectCard: React.FC<{ project: Project; onCardClick: () => void }> = ({ project, onCardClick }) => (
  <div onClick={onCardClick} className="bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer border border-border">
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <ProjectImage src={project.image} alt={`${project.title} logo`} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-border" projectTitle={project.title}/>
        <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
      </div>
      <p className="text-muted-foreground mb-4 flex-grow text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
        ))}
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
        <p className="text-sm text-muted-foreground flex items-center gap-1">Click to see details <WrenchIcon className="w-4 h-4" /></p>
        <div className="flex items-center space-x-4">
          {project.repoLink && <a onClick={e => e.stopPropagation()} href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><GithubIcon /></a>}
          {project.liveLink && <a onClick={e => e.stopPropagation()} href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLinkIcon /></a>}
        </div>
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map(project => (
            <ProjectCard key={project.title} project={project} onCardClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;