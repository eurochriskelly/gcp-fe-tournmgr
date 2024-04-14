import React, { useEffect, useState } from "react";
import { DD } from "gcp-core-fe/src/js/log";
import styles from "./TournamentLayout.module.scss";
import { ITournament, IPitch } from "gcp-core/types";
import Tournament from "gcp-core/dist/esm/src/Tournament.class";

interface Params {
  group: string;
  setGroup: (group: string) => void;
  tournament: ITournament;
  children: any;
}

const TournamentLayout = ({
  group = "", 
  setGroup, 
  tournament, 
  children 
}: Params) => {
  const [existingGroups, setExistingGroups] = useState([]);
  // FIXME: make the tournament object sooner
  const [tournamentData, setTournamentData] = useState<any>(null);

  useEffect(() => {
    const tournamentId = tournament?.tournamentId;
    if (!tournamentId) return;
    setTournamentData(new Tournament(tournament));
  }, [tournament]);

  return (
    <div className={styles.tournamentLayout}>
      <div className={styles.sidePanel}>
        <SideSection title="Tournament">
          <div className={styles.tournamentTitle}>{tournament?.description}</div>
        </SideSection>

        <SideSection title="Categories">
          <EditSelector action={setGroup} current={group} list={tournamentData?.categoryNames} />
        </SideSection>

        <SideSection title="Pitches">
          <EditSelector list={tournament.pitches.map((x: IPitch) => x.name)} />
        </SideSection>
      </div>
      <div>
        <div className={styles.groupDetailsSection}>
          <h3>Define groups for [{group}]</h3>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default TournamentLayout;

function SideSection({ title = "PLEASE SET!", children }) {
  return (
    <div className={styles.sideSection}>
      <h5 className={styles.sideLabel}>{title}:</h5>
      {children}
    </div>
  );
}

function EditSelector({ list = [], current = "", action = () => {} }) {
  //
  return (
    <div>
      {list.map((x, i) => (
        <div
          key={`{x}-${i}`}
          className={`${styles.groupItem} ${
            current === x ? styles.active : ""
          }`}
          onClick={() => {
            DD("From TournamentLayout, selected:", x);
            action(x);
          }}
        >
          {x}
        </div>
      ))}
    </div>
  );
}

