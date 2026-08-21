"use client";

import { Database, FlaskConical, Pause, Play } from "lucide-react";
import {
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Locale } from "@/lib/content";

type OrbitName = "one" | "two" | "three";

const orbitNames: OrbitName[] = ["one", "two", "three"];

function Orbit({ name }: { name: OrbitName }) {
  const orbitClass = `hero-science__orbit hero-science__orbit--${name}`;
  return (
    <>
      <div className={`${orbitClass} hero-science__orbit--path`}>
        <span className="hero-science__orbit-path" />
      </div>
      <div
        className={`${orbitClass} hero-science__orbit-depth hero-science__orbit-depth--back`}
      >
        <span className="hero-science__orbit-runner">
          <span className="hero-science__satellite" />
        </span>
      </div>
      <div
        className={`${orbitClass} hero-science__orbit-depth hero-science__orbit-depth--front`}
      >
        <span className="hero-science__orbit-runner">
          <span className="hero-science__satellite" />
        </span>
      </div>
    </>
  );
}

function resetParallax(element: HTMLDivElement) {
  element.style.setProperty("--globe-shift-x", "0px");
  element.style.setProperty("--globe-shift-y", "0px");
  element.style.setProperty("--globe-tilt-x", "0deg");
  element.style.setProperty("--globe-tilt-y", "0deg");
}

export function HeroGlobe({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const english = locale === "en";
  const themes = [
    { key: "science", label: "Science" },
    { key: "access", label: english ? "Access" : "Accès" },
    { key: "cooperation", label: english ? "Cooperation" : "Coopération" },
  ];

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      paused ||
      event.pointerType === "touch" ||
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)")
        .matches
    )
      return;

    const rect = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - rect.left) / rect.width - 0.5;
    const vertical = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty(
      "--globe-shift-x",
      `${(horizontal * 10).toFixed(2)}px`,
    );
    event.currentTarget.style.setProperty(
      "--globe-shift-y",
      `${(vertical * 8).toFixed(2)}px`,
    );
    event.currentTarget.style.setProperty(
      "--globe-tilt-x",
      `${(-vertical * 3).toFixed(2)}deg`,
    );
    event.currentTarget.style.setProperty(
      "--globe-tilt-y",
      `${(horizontal * 4).toFixed(2)}deg`,
    );
  }

  function handlePause(event: ReactMouseEvent<HTMLButtonElement>) {
    const globe = event.currentTarget.closest<HTMLDivElement>(".hero-science");
    if (globe) resetParallax(globe);
    setPaused((current) => !current);
  }

  return (
    <div
      className={`hero-science${paused ? " hero-science--paused" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => resetParallax(event.currentTarget)}
      onPointerCancel={(event) => resetParallax(event.currentTarget)}
    >
      <div
        className="hero-science__parallax"
        role="img"
        aria-label={
          english
            ? "Animated scientific globe with Science, Access and Cooperation in orbit"
            : "Globe scientifique animé avec Science, Accès et Coopération en orbite"
        }
      >
        <div className="hero-science__planet">
          <span className="hero-science__surface" />
          <span className="hero-science__globe-grid" />
        </div>
        {orbitNames.map((name) => (
          <Orbit key={name} name={name} />
        ))}
        <div className="hero-science__core">
          <span>IAM</span>
          <small>
            {english
              ? "Science · Access · Cooperation"
              : "Science · Accès · Coopération"}
          </small>
        </div>
      </div>

      <button
        className="hero-science__motion-toggle"
        type="button"
        aria-pressed={paused}
        onClick={handlePause}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        <span>
          {paused
            ? english
              ? "Play animation"
              : "Activer l’animation"
            : english
              ? "Pause animation"
              : "Mettre en pause"}
        </span>
      </button>

      <div className="hero-science__card hero-science__card--top">
        <FlaskConical aria-hidden="true" />
        <span>{english ? "Scientific evidence" : "Preuve scientifique"}</span>
      </div>
      <div className="hero-science__card hero-science__card--bottom">
        <Database aria-hidden="true" />
        <span>{english ? "Sourced data" : "Données sourcées"}</span>
      </div>

      <ul
        className="hero-science__themes"
        aria-label={english ? "Orbit themes" : "Thèmes des orbites"}
      >
        {themes.map((theme) => (
          <li key={theme.key} className={`theme-${theme.key}`}>
            <span aria-hidden="true" />
            {theme.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
