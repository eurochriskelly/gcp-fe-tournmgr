import React, { useEffect, useState } from "react";
import { ListBox } from 'primereact/listbox';
import { Calendar } from 'primereact/calendar';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DD } from "gcp-core-fe/src/js/log";
import { ITournament, IPitch } from "gcp-core/types";
import Tournament from "gcp-core/src/Tournament.class.ts";
import TournamentDetail from "./TournamentDetail";

import styles from "./TournamentLayout.module.scss";

interface Params {
  group: string;
  setGroup: (group: string) => void;
  tournament: ITournament;
  children: any;
}

const TournamentLayout = ({
  group = "", 
  tournament, 
  children 
}: Params) => {
  const [tournamentData, setTournamentData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const tournamentId = tournament?.tournamentId;
    if (!tournamentId) return;
    setTournamentData(new Tournament(tournament));
  }, [tournament]);

  return (
    <Panel header="Tournament Builder">
      <div className={styles.tournamentLayout}>
        <div className={styles.sidePanel}>
          <SideSection title="Event">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Title" value={tournament?.description} />
            </div>
            <div>{tournament?.startDate}</div>
            <Calendar value={tournament?.startDate} onChange={(e) => e} />
          </SideSection>

          <SideSection title="Categories">
            <ListBox value={selectedCategory} onChange={(e) => setSelectedCategory(e.value?.name)} options={tournamentData?.categoryPairs} optionLabel="name" className="w-full md:w-14rem" />
          </SideSection>

          { selectedCategory && <Accordion activeIndex={0}>
            <AccordionTab header="Teams">
              <ListBox 
                value={selectedCategory} 
                options={tournamentData?.getTeamPairs(selectedCategory)}
                optionLabel="name" 
                listStyle={{ maxHeight: '400px' }}
                className="w-full md:w-14rem" />
            </AccordionTab>

            <AccordionTab header="Brackets">
              <EditSelector list={tournament.pitches.map((x: IPitch) => x.name)} />
            </AccordionTab>

            <AccordionTab header="Pitches">
              <EditSelector list={tournament.pitches.map((x: IPitch) => x.name)} />
            </AccordionTab>
          </Accordion>}
        </div>
        <TournamentDetail data={tournamentData} category={selectedCategory} />
      </div>
    </Panel>
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

