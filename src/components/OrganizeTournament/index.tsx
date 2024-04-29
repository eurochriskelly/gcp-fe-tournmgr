import React, { useState } from 'react';
import GroupManager from "./GroupManager";
import TournamentSelector from "./TournamentSelector";
import TournamentLayout from "./TournamentLayout";

import { ITournament } from 'gcp-core/types'

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import styles from './OrganizeTournament.module.scss';

const OrganizeTournament = () => {
    const [selectedTournament, setSelectedTournament] = useState<ITournament | null>(null)
    const [selectedGroup, setSelectedGroup] = useState(null)

    return <div className={styles.organizeTournament}>

        <TournamentSelector
            tournamentId={selectedTournament?.tournamentId}
            tournamentTitle={selectedTournament?.description}
            setTournament={(x: ITournament) => setSelectedTournament(x) }
        />
        {selectedTournament?.tournamentId && <TournamentLayout
            tournament={selectedTournament}
            group={selectedGroup}
            setGroup={setSelectedGroup}>
            <>{
                selectedGroup && <GroupManager
                    group={selectedGroup}
                    tournament={selectedTournament}
                />
            }</>
        </TournamentLayout>
        }
    </div>
}

export default OrganizeTournament
