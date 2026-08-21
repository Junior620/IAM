"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export type GalleryCategory =
  | "duphat2020"
  | "cosmetics"
  | "schoolSupport2021"
  | "institution"
  | "training"
  | "meetings"
  | "science";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  categoryLabel: string;
  format: "landscape" | "portrait" | "wide";
  description?: string;
  credit: string;
  rights: string;
};

type GalleryLabels = {
  all: string;
  filters: string;
  results: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  credit: string;
  rights: string;
};

export function GalleryGrid({
  items,
  categories,
  labels,
}: {
  items: GalleryItem[];
  categories: Array<{ id: GalleryCategory; label: string }>;
  labels: GalleryLabels;
}) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">(
    "all",
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === "all"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );
  const selectedIndex = visibleItems.findIndex(
    (item) => item.id === selectedId,
  );
  const selectedItem =
    selectedIndex >= 0 ? visibleItems[selectedIndex] : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedItem && !dialog.open) dialog.showModal();
    if (!selectedItem && dialog.open) dialog.close();
  }, [selectedItem]);

  function closeDialog() {
    setSelectedId(null);
  }

  function changeImage(direction: -1 | 1) {
    if (selectedIndex < 0) return;
    const nextIndex =
      (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[nextIndex]?.id ?? null);
  }

  return (
    <>
      <div className="gallery-filters" aria-label={labels.filters}>
        <button
          type="button"
          aria-label={`${labels.all} (${items.length})`}
          aria-pressed={activeCategory === "all"}
          onClick={() => {
            setActiveCategory("all");
            closeDialog();
          }}
        >
          {labels.all}
          <span>{items.length}</span>
        </button>
        {categories.map((category) => {
          const count = items.filter(
            (item) => item.category === category.id,
          ).length;
          return (
            <button
              key={category.id}
              type="button"
              aria-label={`${category.label} (${count})`}
              aria-pressed={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
                closeDialog();
              }}
            >
              {category.label}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="gallery-results" aria-live="polite">
        {visibleItems.length} {labels.results}
      </p>

      <div className="gallery-grid">
        {visibleItems.map((item, index) => (
          <article
            className={`gallery-card gallery-card--${item.format}`}
            key={item.id}
          >
            <button
              type="button"
              onClick={() => setSelectedId(item.id)}
              aria-label={`${labels.open} : ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={
                  item.format === "wide"
                    ? "(max-width: 720px) 100vw, (max-width: 1100px) 100vw, 66vw"
                    : "(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                }
                priority={index < 2}
              />
              <span className="gallery-card__shade" aria-hidden="true" />
              <span className="gallery-card__content">
                <span>{item.categoryLabel}</span>
                <strong>{item.title}</strong>
              </span>
              <span className="gallery-card__expand" aria-hidden="true">
                <Expand />
              </span>
            </button>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        aria-labelledby="gallery-lightbox-title"
        onCancel={closeDialog}
        onClose={() => setSelectedId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {selectedItem ? (
          <div className="gallery-lightbox__panel">
            <div className="gallery-lightbox__topbar">
              <span>
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(visibleItems.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={closeDialog}
                aria-label={labels.close}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="gallery-lightbox__media">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                fill
                sizes="95vw"
              />
            </div>
            <div className="gallery-lightbox__footer">
              <div>
                <span>{selectedItem.categoryLabel}</span>
                <h2 id="gallery-lightbox-title">{selectedItem.title}</h2>
                {selectedItem.description ? (
                  <p className="gallery-lightbox__description">
                    {selectedItem.description}
                  </p>
                ) : null}
                <dl>
                  <div>
                    <dt>{labels.credit}</dt>
                    <dd>{selectedItem.credit}</dd>
                  </div>
                  <div>
                    <dt>{labels.rights}</dt>
                    <dd>{selectedItem.rights}</dd>
                  </div>
                </dl>
              </div>
              <div className="gallery-lightbox__navigation">
                <button
                  type="button"
                  onClick={() => changeImage(-1)}
                  aria-label={labels.previous}
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => changeImage(1)}
                  aria-label={labels.next}
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
