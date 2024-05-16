import * as React from "react";
import { Logo } from "../components/Logo";
import { Background } from "../components/Background";
import { Colorway, Hoverboard } from "../components/Hoverboard";
import { Features } from "../components/Features";
import { Column, PlaceHolderWrapper, PurchaseForm } from "components";


export default function Product() {
  const [formData, setFormData] = React.useState<{ color: Colorway }>({
    color: "red",
  });
  const handleDataChange = (id, value) => {
    setFormData(currentFormData => ({
      ...currentFormData,
      [id]: value,
    }));
  };

  return (
    <main
      style={{
        display: "grid",
        placeItems: "center",
        paddingTop: "var(--space-3)",
        paddingBottom: "var(--space-3)",
        gap: "var(--space-3)",
      }}
    >
      <Column gap={1}>
        <h1 className="screen-reader-only">Overboard</h1>
        <h2 className="screen-reader-only">Bugslayer</h2>
        <Logo />

        <Features />
      </Column>

      <div className="ProductAnimation">
        <PlaceHolderWrapper>
          <Hoverboard color={formData.color} />
        </PlaceHolderWrapper>
      </div>

      <Background />

      <PurchaseForm data={formData} onDataChange={handleDataChange} />
    </main>
  );
}
