const missionInsert = async () => {
    const missionTitle = document.getElementById('missionTitle');
    alert(missionTitle);
    axios.post('/mission/insert', { 'missionTitle': missionTitle })
    .then(res => {
        console.log(res);
    });
}
