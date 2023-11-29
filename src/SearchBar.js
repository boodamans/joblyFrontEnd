import React, { useState } from "react";
import { Input, InputGroup, Button } from "reactstrap";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Pass the search term to the parent component
    onSearch(searchTerm);
  };

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="input-group-append">
        <Button color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </InputGroup>
  );
}

export default SearchBar;
