let search = document.querySelector('input');
let inputChat = document.querySelector('div[role="textbox"]');

let contacts = document.querySelectorAll('div[role="gridcell"] a');
let activeContacts = document.querySelectorAll('.pedkr2u6 ul a[role="link"]');
let results = document.querySelectorAll('ul[role="listbox"] ul li a');

let areaContact = document.querySelector('div[role="grid"]');
let areaActiveContact = document.querySelector('.pedkr2u6');
let areaChat = document.querySelector('.buofh1pr.j83agx80.eg9m0zos.ni8dbmo4.cbu4d94t.gok29vw1');
let areaSearchResult = document.querySelector('ul[role="listbox"]');

let preferencesButton = document.querySelector('.ozuftl9m div[role="button"]');
let activeContactsButton = document.querySelectorAll('.l9j0dhe7.swg4t2nn div[role="menuitem"]')[1];
let likeButton = document.querySelectorAll('.kavbgo14 div[role="button"]')[9];
let infoButtons = document.querySelectorAll('.bafdgad4.tkr6xdv7 div[role="button"]');
let infoButton = infoButtons.length == 1 ? infoButtons[0] : infoButtons[2];
let quitSearchResultButton = document.querySelector('.thwo4zme div[role="button"]');
let quitActiveContactButton = document.querySelector('.pedkr2u6 div[role="button"]');

let focused = 'chatInput';
let opened = 'contactList';

let contact_index = -1;
let activeContact_index = -1;
let result_index = -1;

let darkmode = false;

//utils

const resetTabIndex = function()
{
  document.querySelectorAll('*[tabindex]').forEach(function (element)
  {
    element.tabIndex = -1;
  });
};

const refreshDom = function()
{
  search = document.querySelector('input');
  inputChat = document.querySelector('div[role="textbox"]');

  contacts = document.querySelectorAll('div[role="gridcell"] a');
  activeContacts = document.querySelectorAll('.pedkr2u6 ul a[role="link"]');
  results = document.querySelectorAll('ul[role="listbox"] ul li a');

  areaActiveContact = document.querySelector('*[role="navigation"] .pmk7jnqg.b5wmifdl.ms05siws.pnx7fd3z.b7h9ocf4.k4urcfbm.datstx6m.j83agx80.kr9hpln1');
  areaContact = document.querySelector('div[role="grid"]');
  areaChat = document.querySelector('.buofh1pr.j83agx80.eg9m0zos.ni8dbmo4.cbu4d94t.gok29vw1');
  areaSearchResult = document.querySelector('ul[role="listbox"]');

  preferencesButton = document.querySelectorAll('.j83agx80.pfnyh3mw .ozuftl9m')[0].lastChild;
  activeContactsButton = document.querySelectorAll('.l9j0dhe7.swg4t2nn div[role="menuitem"]')[1];
  infoButtons = document.querySelectorAll('.bafdgad4.tkr6xdv7 div[role="button"]');
  infoButton = infoButtons.length == 1 ? infoButtons[0] : infoButtons[2];
  likeButton = document.querySelectorAll('.kavbgo14 div[role="button"]')[9];
  quitSearchResultButton = document.querySelector('.thwo4zme div[role="button"]');
  quitActiveContactButton = document.querySelector('.pedkr2u6 div[role="button"]');
};

const focus = function(element)
{
  //blur all
  const tmp = document.createElement('input');
  document.body.appendChild(tmp);
  tmp.focus();
  document.body.removeChild(tmp);

  if (element == 'searchInput')
      search.focus();
  else if (element == 'chatInput')
       inputChat.focus();
  else if (element == 'chatList')
       areaChat.focus();
  else if (element == 'contactList')
      areaContact.focus();
  else if (element == 'activeContactList')
      areaActiveContact.focus();
  else if (element == 'resultList')
      areaSearchResult.focus();
 
  focused = element;
  console.log(focused);
};

const updateOpened = function()
{
  opened = 'contactList';
 
  //check if activeContactList is opened
  let activeContactsElements = document.getElementsByClassName('pmk7jnqg b5wmifdl ms05siws pnx7fd3z b7h9ocf4 k4urcfbm datstx6m j83agx80 kr9hpln1');
  let searchResultElements = document.querySelector('*[role="listbox"]');
  if (activeContactsElements.length > 0 && searchResultElements === null)
    opened = activeContactsElements[0].style.transform === "translateX(-100%) translateZ(1px)" ? 'activeContactList' : opened;
  else//check if resultList is opened
    opened = document.querySelector('*[role="listbox"]') != null ? 'resultList' : opened; 
};

const setDarkMode = function(mode)
{
  if (mode == true)
  {
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    document.querySelectorAll('image, img').forEach(function (img) {
      img.style.filter = 'invert(1) hue-rotate(180deg)';
    });
  }
  else
  {
    document.body.style.filter = '';
    document.querySelectorAll('image, img').forEach(function (img) {
      img.style.filter = '';
    });
  }
  
  darkmode = mode;
  browser.storage.local.set({'darkmode': mode});
};



//reset tabindex
resetTabIndex();

//add smooth transition to switch darmode
document.body.style.transition = 'all ease 0.6s';


//wait for image to trigger darkmode
let loaded = setInterval(function() {
   console.log(document.querySelectorAll('image, img').length);
   if (document.querySelectorAll('image, img').length > 1) {


      darkmode = browser.storage.local.get(['darkmode']).then(function (res) {
        if (res.hasOwnProperty('darkmode'))
        {
          setDarkMode(res.darkmode);
        }
        else
          setDarkmode(false);
      
        return res.darkmode;
      });

      clearInterval(loaded);
   }

}, 100); 

//events
document.addEventListener('keydown', function (e) {

  //check what is in the sidebar contacts ? activeContacts ? searchResults ?
  updateOpened();

  if (e.key == '/' && focused != 'searchInput' && focused != 'chatInput')
  {
    //focus search input
    focus('searchInput'); 

    e.preventDefault();
  }
  else if (e.key == 'i' && focused != 'searchInput' && focused != 'chatInput')
  {
    //focus chat input
    focus('chatInput');
    e.preventDefault();
  }
  else if (e.key == 'o' && focused != 'searchInput' && focused != 'chatInput')
  {
    //open / hide info sidebar
    infoButton.click();
    focus('chatList');
    e.preventDefault();
  }
  else if (e.key == 'u' && focused != 'searchInput' && focused != 'chatInput')
  {
    //send a like
    likeButton.click();
    focus('chatList');
    e.preventDefault();
  }
  else if (e.key == 'd' && focused != 'searchInput' && focused != 'chatInput')
  {
    setDarkMode(!darkmode);
    e.preventDefault();
  }
  else if (e.key == 'a' && focused != 'searchInput' && focused != 'chatInput' && opened != 'activeContactList')
  {
    preferencesButton.click();
    setTimeout(function () {
      refreshDom();
      activeContactsButton.click();
    }, 400);

    refreshDom();
    focus('activeContactList');
    e.preventDefault();
  }
  else if (e.key == 'Escape')
  {
    //refresh elements
    refreshDom();

    if (focused == 'chatInput')
    {
      focus('chatList');
    }
    else if (opened == 'activeContactList')
    {
        quitActiveContactButton.click();
        focus('contactList');
        //opened = 'contactList';
    }
    else if (opened == 'resultList' && focused == 'searchInput')
    {
      //1. blur searchInput focus resultList to let user browse list with j-k
      focus('resultList');
    }
    else if (opened == 'resultList' && focused == 'resultList' && quitSearchResultButton !== null)
    {
      //2.simulate back button click go back to contactlist
      quitSearchResultButton.click();
      focus('contactList');
    }
    else
    {
      //blur all
      focus('none');
    }
    
    e.preventDefault();
  }
  else if (e.key == 'Tab' && focused != 'chatInput' && focused != 'searchInput')
  {
    //focus list(left sidebar) or chat
    let el = (focused == 'chatList' ? opened : 'chatList');
    focus(el);

    e.preventDefault();
  }
  else if (e.key == 'h' && focused != 'chatInput' && focused != 'searchInput')
  {
    //focus list(left sidebar)
    focus(opened);
    e.preventDefault();
  }
  else if (e.key == 'l' && focused != 'chatInput' && focused != 'searchInput')
  {
    //focus chat
    focus('chatList');
    e.preventDefault();
  }
  else if ((e.key == 'k' || e.key == 'j') && opened == 'resultList' && focused == 'resultList')
  {
    result_index += e.key == 'j' ? 1 : -1;
    
    //limit list
    result_index = result_index < -1 ? -1 : result_index;
    result_index = result_index > results.length ? results.length : result_index;

    //set all result background white
    results.forEach(function (result) {
      result.style.backgroundColor = "white";
    });

    //focus the selected result
    results[result_index].focus();
    results[result_index].style.backgroundColor="#f5f5f5";
  }
  else if ((e.key == 'k' || e.key == 'j') && opened == 'activeContactList' && focused == 'activeContactList')
  {
    refreshDom();

    activeContact_index += e.key == 'j' ? 1 : -1;
    
    //limit list
    activeContact_index = activeContact_index < -1 ? -1 : activeContact_index;
    activeContact_index = activeContact_index > activeContacts.length ? activeContacts.length : activeContact_index;

    //set all active contacts background white
    activeContacts.forEach(function (contact) {
      contact.style.backgroundColor = "white";
    });

    //focus the selected contact
    activeContacts[activeContact_index].focus();
    activeContacts[activeContact_index].style.backgroundColor="#f5f5f5";
  }
  else if ((e.key == 'k' || e.key == 'j') && opened == 'contactList' && focused == 'contactList')
  {
    contact_index += e.key == 'j' ? 1 : -1;
   
    //limit list
    contact_index = contact_index < -1 ? -1 : contact_index;
    contact_index = contact_index > contacts.length ? contacts.length : contact_index;

    contacts[contact_index].focus();
  }
  else if ((e.key == 'k' || e.key == 'j') && focused == 'chatList')
  {
    areaChat.click();
    let scroll = e.key == 'j' ? 200 : -200;
    let size  = areaChat.scrollTop + scroll;
    areaChat.scrollTo({top: size, behavior: 'smooth'}); 
  }
  else if (e.key == 'Enter' && (focused == 'contactList' || focused == 'activeContactsList' || focused == 'resultList'))
  {
    //refresh element
    refreshDom();

    //reset tab index
    resetTabIndex();

    // when select new conversation chat Input is set by default
    focused = 'chatInput';
  }
 
  //@todo same function for focus with activeElement
  updateOpened();

});

