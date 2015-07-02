/** @jsx React.DOM */

// CSS from http://stackoverflow.com/questions/19064987/html-css-popup-div-on-text-click
// and http://stackoverflow.com/questions/10019797/pure-css-close-button
var LightboxModal = React.createClass({

    whiteContentStyles: {
        position: 'fixed',
        top: '15%',
        bottom: '10%',
        left: '5%',
        right: '5%',
        backgroundColor: '#f6f1eb',
        color: '#666633',
        padding: '5px',
        border: '2px solid #666633',
        borderRadius: '10px',
        boxShadow: '0 1px 5px #333',
        zIndex:'101'
    },

    blackOverlayStyles: {
        background: 'black',
        opacity: '.5',
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        zIndex: '100'
    },

    closeTagStyles: {
        float: 'right',
        marginTop: '-20px',
        marginRight: '-20px',
        cursor: 'pointer',
        color: '#f6f1eb',
        border: '1px solid #f6f1eb',
        borderRadius: '30px',
        background: '#666633',
        fontSize: '31px',
        fontWeight: 'bold',
        display: 'inline-block',
        lineHeight: '0px',
        padding: '11px 3px',
        textDecoration: 'none'
    },

    componentDidMount: function(){
        document.addEventListener("keydown", function (e) {
            if ( (this.props.display) && (e.keyCode === 27) ){
                this.props.closeLightbox();
            }
        }.bind(this));
    },

    render: function(){
        for (var j in this.props){
            if (j !== 'children'){
                this.props.children.props[j] = this.props[j];
            }
        }

        if (this.props.display){
            return (
                <div>
                    <div style={this.blackOverlayStyles} onClick={this.props.closeLightbox} />
                    <div style={this.whiteContentStyles}>
                        <a style={this.closeTagStyles} onClick={this.props.closeLightbox}>&times;</a>
                        {this.props.children}
                    </div>
            </div>
            );
        } else {
            return (<div></div>);
        }
    }
});


var LightboxTrigger = React.createClass({
    render: function(){
        this.props.children.props.onClick = this.props.openLightbox;
        for (var j in this.props){
            if (j !== 'children'){
                this.props.children.props[j] = this.props[j];
            }
        }
        return this.props.children;
    }
});


var Lightbox = React.createClass({

    getInitialState: function(){
        return { display: false };
    },

    componentWillMount: function(){
        if (this.props.data)
            this.setState(this.props.data);
    },

    openLightbox: function(){
        this.setState({display: true});
    },

    closeLightbox: function(){
        this.setState({display: false});
    },

    setLightboxState: function(obj){
        this.setState(obj);
    },

    render: function(){
        var childrenWithProps = this.props.children.map(function(child, i) {
            var childProps = {
                openLightbox: this.openLightbox,
                closeLightbox: this.closeLightbox,
                setLightboxState: this.setLightboxState,
                key: i
            };
            for (var j in this.state){
                childProps[j] = this.state[j];
            }
            var childWithProps = React.addons.cloneWithProps(child, childProps);
            return childWithProps;
        }, this);

        return (
            <div>
                {childrenWithProps}
            </div>
        );
    }
});
