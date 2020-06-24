class People
{
    NationalityType;
    ThisElement;
    static CountPeople = 0;
    constructor()
    {
        People.CountPeople++;
        this.Init();
    }

    Init()
    {
        var temp = '<div class="PeopleItem" NationalityType="1"><img src="Data/1/(1).jpg" alt=""></div>';
        var el = document.createElement('div');
        el.innerHTML = temp;
        this.NationalityType = Math.round(Math.random()*3)+1;
        var peopleNumber= Math.round(Math.random()*9)+1;
        el.firstElementChild.setAttribute('NationalityType',this.NationalityType);
        el.firstElementChild.firstElementChild.setAttribute('src',
        "Data/{nationalityType}/({peopleNumber}).jpg"
        .replace('{nationalityType}',this.NationalityType)
        .replace('{peopleNumber}',peopleNumber));
        this.ThisElement = el.firstElementChild;
        this.ThisElement.style.top = '-150px';

        var elMain = document.getElementById('GamePanel');
        elMain.appendChild(this.ThisElement);
    }

    RemoveElement()
    {
        var elMain = document.getElementById('GamePanel');
        elMain.removeChild(this.ThisElement);
    }

    Hide()
    {
        this.ThisElement.classList.add('PeopleItem_False');
    }

}