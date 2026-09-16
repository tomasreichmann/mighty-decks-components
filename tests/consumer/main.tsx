import { createRoot } from "react-dom/client";
import "@mighty-decks/components/styles.css";
import "./host.css";
import {
  ActorCard,
  AssetCard,
  CompactCard,
  CounterCard,
  EffectCard,
  GameCard,
  LocationCard,
  OutcomeCard,
  SceneCardFrame,
  StuntCard,
} from "@mighty-decks/components/react";

createRoot(document.getElementById("root")!).render(
  <main>
    <button id="host-control">Host control</button>
    <section data-card-fixture="default">
      <OutcomeCard slug="success" />
      <OutcomeCard slug="success" layout="compact" />
      <EffectCard slug="injury" layout="compact" />
      <StuntCard slug="tinkerer" />
      <ActorCard baseLayerSlug="guard_blue" tacticalRoleSlug="thug" />
      <AssetCard baseAssetSlug="base_light_weapon" modifierSlug="base_fast" />
      <CounterCard iconSlug="time" title="Time" currentValue={1} maxValue={3} />
      <CompactCard noun="Custom" />
      <SceneCardFrame title="Scene" description="Fixture" />
      <LocationCard title="Location" />
    </section>
    <section data-card-fixture="custom-base">
      <GameCard type="outcome" slug="success" assetBaseUrl="/cards/assets" />
    </section>
  </main>,
);
