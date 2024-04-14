import React, { useState } from 'react';
import GroupManager from "./GroupManager";
import TournamentSelector from "./TournamentSelector";
import TournamentLayout from "./TournamentLayout";

import { ITournament } from 'gcp-core/types'
import styles from './OrganizeTournament.module.scss';


const OrganizeTournament = () => {
    const [selectedTournament, setSelectedTournament] = useState<ITournament | null>(null)
    const [selectedGroup, setSelectedGroup] = useState(null)

    return <div className={styles.organizeTournament}>
        <h2>Organize Tournament</h2>

        <TournamentSelector
            tournamentId={selectedTournament?.tournamentId}
            tournamentTitle={selectedTournament?.description}
            setTournament={(x: ITournament) => {
                console.log('Setting tournament to', x)
                setSelectedTournament(x)
            }}
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
