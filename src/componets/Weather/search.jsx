

const Search = ({ search, setSearch, handleSearch, isDayTime, sun, night }) => {
    return (
        <>

            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <input type="text"
                        className="form-control w-50"
                        placeholder="Search Weather ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className={isDayTime(sun, night) ? 'btn btn-outline-dark mt-4' : 'btn btn-outline-light mt-4'} onClick={handleSearch}>Search</button>
                </div>
            </div>

        </>
    )
}

export default Search