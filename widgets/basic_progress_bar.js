<style>
.circle-progress {
    width: 70px;
    height: 70px !important;
    float: left;
    line-height: 100px;
    background: none;
    margin: 20px;
    box-shadow: none;
    position: relative
}

.circle-progress:after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 12px solid #fff;
    position: absolute;
    top: 0;
    left: 0
}

.circle-progress>span {
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1
}

.circle-progress .progress-left {
    left: 0
}

.circle-progress .progress-bar {
    width: 100%;
    height: 100%;
    background: none;
    border-width: 10px;
    border-style: solid;
    position: absolute;
    top: 0
}

.circle-progress .progress-left .progress-bar {
    left: 100%;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    border-left: 0;
    -webkit-transform-origin: center left;
    transform-origin: center left
}

.circle-progress .progress-right {
    right: 0
}

.circle-progress .progress-right .progress-bar {
    left: -100%;
    border-top-left-radius: 80px;
    border-bottom-left-radius: 80px;
    border-right: 0;
    -webkit-transform-origin: center right;
    transform-origin: center right;
    animation: loading-1 1.2s linear forwards
}

.circle-progress .progress-value {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: #000;
    font-size: 11px;
    color: #fff;
    line-height: 65px;
    text-align: center;
    position: absolute;
    top: 5%;
    left: 5%
}

.circle-progress.blue .progress-bar {
    border-color: #049dff
}

.circle-progress.blue .progress-left .progress-bar {
    animation: loading-2 1.5s linear forwards 1.8s
}

.circle-progress.yellow .progress-bar {
    border-color: #fdba04
}

.circle-progress.yellow .progress-right .progress-bar {
    animation: loading-3 1.8s linear forwards
}

.circle-progress.yellow .progress-left .progress-bar {
    animation: none
}

@keyframes loading-1 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
}

@keyframes loading-2 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(144deg);
        transform: rotate(144deg)
    }
}

@keyframes loading-3 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    100% {
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg)
    }
}
</style>

<div class="progress blue"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>

    <div class="progress-value" id="id_m_funder_dashboard_view_funds_table_filter_us_stocks">100%</div>
</div>