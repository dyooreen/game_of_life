var socket = io.connect('https://golbyaram.herokuapp.com/');
        setInterval(function () {
            socket.emit("get stats", []);
        }, 10 * 1000);
        socket.on("send stats", function (statistics) {
            statistics = JSON.parse(statistics);
            $('table').html("");
            $('table').append(`<tr>
                <th>Կերպար</th>
                <th>Ծնվել է </th>
                <th>Մահացել է</th>
                <th>Framecount</th>
            </tr>`)
            for (var i in statistics) {
                $('table').append(`
                <tr>
                <td class="Grass">${statistics[i].Grass[0]["name"]}</td>
                <td class="Grass">${statistics[i].Grass[0]["mul"]}</td>
                <td class="Grass">${statistics[i].Grass[0]["die"]}</td>
                <td class="Grass">${statistics[i].timestamp}</td>
                </tr>
                <tr>
                <td class="GrassEater">${statistics[i].GrassEater[0]["name"]}</td>
                <td class="GrassEater">${statistics[i].GrassEater[0]["mul"]}</td>
                <td class="GrassEater">${statistics[i].GrassEater[0]["die"]}</td>
                <td class="GrassEater">${statistics[i].timestamp}</td>
                </tr>
                <tr> 
                <td class="Predator">${statistics[i].Predator[0]["name"]}</td>
                <td class="Predator">${statistics[i].Predator[0]["mul"]}</td>
                <td class="Predator">${statistics[i].Predator[0]["die"]}</td>
                <td class="Predator">${statistics[i].timestamp}</td>
                </tr> 
                <tr> 
                <td class="Devil">${statistics[i].Devil[0]["name"]}</td>
                <td class="Devil">${statistics[i].Devil[0]["mul"]}</td>
                <td class="Devil">${statistics[i].Devil[0]["die"]}</td>
                <td class="Devil">${statistics[i].timestamp}</td>
                </tr> 
                `)
            }
        });