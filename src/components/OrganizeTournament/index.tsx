import React, { useState, useEffect } from 'react';
import GroupSelector from "./GroupSelector";
import GroupManager from "./GroupManager";
import TournamentSelector from "./TournamentSelector";
import TournamentLayout from "./TournamentLayout";
import { Tournament } from '../../utils/types';
import styles from './OrganizeTournament.module.scss';


const OrganizeTournament = () => {
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
    const [selectedGroup, setSelectedGroup] = useState(null)

    return <div className={styles.organizeTournament}>
        <h2>Organize Tournament A</h2>

        <TournamentSelector
            tournamentId={selectedTournament?.id}
            tournamentTitle={selectedTournament?.Title}
            setTournament={(x: Tournament) => {
                console.log('Setting tournament to', x)
                setSelectedTournament(x)
            }}
        />
        {selectedTournament?.id && <TournamentLayout
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
