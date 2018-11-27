document.getElementById('output').style.visibility = 'hidden';

document.getElementById('kgInput').addEventListener('input',function(e){
    let kg = e.target.value;
    document.getElementById('output').style.visibility = 'visible';
    
    if(kg == '' || kg < 0){
        document.getElementById('output').style.visibility = 'hidden';
    }
    
    document.getElementById('gramsOutput').innerHTML = kg * 1000;
    document.getElementById('dkgOutput').innerHTML = kg * 100;
    document.getElementById('tOutput').innerHTML = kg / 1000;
});