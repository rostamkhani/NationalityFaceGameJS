class NationalityGame
{
    speed = 1 ;
    t = null;
    _Width = 0;
    _Height = 0;
    static Counter = 0;
    NumberEndGame = 50;

    constructor(speed,w,h) {
        this.speed = speed;
        this._Width = w;
        this._Height = h;

        var elMain = document.getElementById('GamePanel');
        elMain.style.width =  w +'px';
        elMain.style.height =  h +'px';

        var elGameScoreboard = document.getElementById('GameScoreboard');
        elGameScoreboard.style.height = h +'px';
        elGameScoreboard.style.left = (w+110) +'px';

        this.Init();

      }

    Init() {
        this.Start();
    }

    Start()
    {
        if(People.CountPeople >= this.NumberEndGame)
        {
            this.Stop();
            dispatchEvent(new Event('EndGame'));
            return;
        }

        var p = new People();
        lblCount.html(People.CountPeople);



        var el = p.ThisElement;
        var x = -90;
        var _this = this;
        var _h = this._Height;
        var _speed = this.speed;
        this.t = setInterval(function () {
            x += _speed;
            el.style.top = x + 'px'
            if(x > _h)
            {
                
                p.RemoveElement();
                _this.Stop();
                _this.Start();
            }
        },1);
        p.ThisElement.addEventListener('mousedown',function()
        {
            //_this.Stop();
        });
        p.ThisElement.addEventListener('mouseup',function()
        {
            //p.Hide();
            //_this.Start();
        });
        p.ThisElement.addEventListener('transitionend',function()
        {
            p.RemoveElement();
        });
    }

    Stop()
    {
        clearInterval(this.t);
    }
}