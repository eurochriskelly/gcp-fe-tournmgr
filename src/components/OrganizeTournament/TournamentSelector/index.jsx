import React, { useEffect, useState } from "react";
import AutocompleteSelect from "gcp-core-fe/components/AutocompleteSelect";

const TournamentSelector = ({
  tournamentId,
  tournamentTitle,
  setTournament,
}) => {
  const [existingTournaments, setExistingTournaments] = useState([]);
  useEffect(() => {
    fetch(`/api/tournaments`)
      .then((response) => response.json())
      .then((data) => {
        setExistingTournaments(data.data);
      })
      .catch((error) => {
        console.error("Error fetching next fixtures:", error);
      });
  }, []);

  const setTournamentByTitle = (title) => {
    const tournament = existingTournaments.find((x) => x.Title === title);
    // Get all trounament data
    fetch(`/api/tournaments/${tournament.Id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Setting tournament to`, data.data);
        setTournament(data.data);
      })
      .catch((error) => {
        console.error("Error fetching next fixtures:", error);
      });
  };
  const style = {
    display: tournamentId ? "none" : "block",
  };
  return (
    <div style={style}>
      <h3>Tournament Selector</h3>
      <AutocompleteSelect
        options={existingTournaments.map((x) => x.Title)}
        limit={8}
        selectAction={setTournamentByTitle}
      />
    </div>
  );
};

export default TournamentSelector;

