const xe = "2026-09-18", Ce = /* @__PURE__ */ JSON.parse(`[{"id":"outcome:special-action","family":"outcome","slug":"special-action","title":"Special Action","body":"Activate your special action","footer":"3 Effect","description":"Activate your special action\\n3 Effect","deck":"base","artworkPath":"/outcomes/special-action.png","locale":"en"},{"id":"outcome:success","family":"outcome","slug":"success","title":"Success","body":"It worked!","footer":"2 Effect","description":"It worked!\\n2 Effect","deck":"base","artworkPath":"/outcomes/success.png","locale":"en"},{"id":"outcome:partial-success","family":"outcome","slug":"partial-success","title":"Partial Success","body":"It mostly worked","footer":"1 Effect","description":"It mostly worked\\n1 Effect","deck":"base","artworkPath":"/outcomes/partial-success.png","locale":"en"},{"id":"outcome:fumble","family":"outcome","slug":"fumble","title":"Fumble","body":"The action most likely fails.\\nThe Storyteller may allow partial success with a serious Complication.","footer":"Catastrophe: 3 or only Fumbles after draw.","description":"The action most likely fails.\\nThe Storyteller may allow partial success with a serious Complication.\\nCatastrophe: 3 or only Fumbles after draw.","deck":"base","artworkPath":"/outcomes/fumble.png","locale":"en"},{"id":"outcome:chaos","family":"outcome","slug":"chaos","title":"Chaos","body":"Something unexpected happened","footer":"Cannot be used for defense","description":"Something unexpected happened\\nCannot be used for defense","deck":"base","artworkPath":"/outcomes/chaos.png","locale":"en"},{"id":"effect:injury","family":"effect","slug":"injury","title":"Injury","body":"4x Injury ➜ Taken Out.","footer":"Use an action or an Asset to heal and discard.","description":"4x Injury ➜ Taken Out.\\nUse an action or an Asset to heal and discard.","deck":"base","artworkPath":"/effects/injury.png","locale":"en"},{"id":"effect:distress","family":"effect","slug":"distress","title":"Distress","body":"3x Distress ➜ Panic.\\n4x Distress ➜ Hopeless.","footer":"Use an action or an Asset to recover and discard.","description":"3x Distress ➜ Panic.\\n4x Distress ➜ Hopeless.\\nUse an action or an Asset to recover and discard.","deck":"base","artworkPath":"/effects/distress.png","locale":"en"},{"id":"effect:taken-out","family":"effect","slug":"taken-out","title":"Taken Out","body":"4x Injury: You are Taken Out. You cannot act until the fiction and recovery rules allow it.","footer":"Heal your Injuries to discard.","description":"4x Injury: You are Taken Out. You cannot act until the fiction and recovery rules allow it.\\nHeal your Injuries to discard.","deck":"base","artworkPath":"/art/effects/taken-out.png","locale":"en"},{"id":"effect:panicked","family":"effect","slug":"panicked","title":"Panicked","body":"3x Distress: You can only play the top card of your Outcome deck.","footer":"Recover from your Distress to discard.","description":"3x Distress: You can only play the top card of your Outcome deck.\\nRecover from your Distress to discard.","deck":"base","artworkPath":"/effects/panicked.png","locale":"en"},{"id":"effect:hopeless","family":"effect","slug":"hopeless","title":"Hopeless","body":"4x Distress: You can only flee or give up.","footer":"Recover from your Distress to discard.","description":"4x Distress: You can only flee or give up.\\nRecover from your Distress to discard.","deck":"base","artworkPath":"/effects/hopeless.png","locale":"en"},{"id":"effect:stuck","family":"effect","slug":"stuck","title":"Stuck","body":"You cannot move, but you can still take other actions.","footer":"Use an action to free yourself and discard.","description":"You cannot move, but you can still take other actions.\\nUse an action to free yourself and discard.","deck":"base","artworkPath":"/effects/stuck.png","locale":"en"},{"id":"effect:hindered","family":"effect","slug":"hindered","title":"Hindered","body":"You can only move or take actions, but not both.","footer":"Use an action to free yourself and discard.","description":"You can only move or take actions, but not both.\\nUse an action to free yourself and discard.","deck":"base","artworkPath":"/effects/hindered.png","locale":"en"},{"id":"effect:boost","family":"effect","slug":"boost","title":"Boost","body":"Your next action or defense has +1 Effect or +1 Move.","description":"Your next action or defense has +1 Effect or +1 Move.","deck":"base","artworkPath":"/effects/boost.png","locale":"en"},{"id":"effect:complication","family":"effect","slug":"complication","title":"Complication","body":"A Complication makes your life harder.","footer":"Usually −1 Effect the next time it applies, then discard. The Storyteller may define another fitting effect or removal condition.","description":"A Complication makes your life harder.\\nUsually −1 Effect the next time it applies, then discard. The Storyteller may define another fitting effect or removal condition.","deck":"base","artworkPath":"/effects/complication.png","locale":"en"},{"id":"effect:freezing","family":"effect","slug":"freezing","title":"Freezing","body":"Every turn you end with 2x Freezing or more, you receive a Distress. Cancelled by Burning.","footer":"Use an action or an Asset to discard.","description":"Every turn you end with 2x Freezing or more, you receive a Distress. Cancelled by Burning.\\nUse an action or an Asset to discard.","deck":"base","artworkPath":"/effects/freezing.png","locale":"en"},{"id":"effect:burning","family":"effect","slug":"burning","title":"Burning","body":"Every turn you end with 2x Burning or more, you receive an Injury. Cancelled by Freezing.","footer":"Use an action or an Asset to discard.","description":"Every turn you end with 2x Burning or more, you receive an Injury. Cancelled by Freezing.\\nUse an action or an Asset to discard.","deck":"base","artworkPath":"/effects/burning.png","locale":"en"},{"id":"stunt:dontGiveUp","family":"stunt","slug":"dontGiveUp","title":"Don't Give Up","body":"You need +1 Distress to get Panicked or Hopeless.","footer":"Recover from Panicked.","description":"You need +1 Distress to get Panicked or Hopeless.\\nRecover from Panicked.","deck":"Brawler","artworkPath":"/stunts/base/dont-give-up.png","locale":"en"},{"id":"stunt:bringThePain","family":"stunt","slug":"bringThePain","title":"Bring the Pain","body":"You need +1 Injury to be Taken Out.","footer":"Recover from being Taken Out.","description":"You need +1 Injury to be Taken Out.\\nRecover from being Taken Out.","deck":"Brawler","artworkPath":"/stunts/base/bring-the-pain.png","locale":"en"},{"id":"stunt:fearless","family":"stunt","slug":"fearless","title":"Fearless","body":"You are always Panicked, but you get Hindered instead of Hopeless.","footer":"Defend from a Distress while Panicked.","description":"You are always Panicked, but you get Hindered instead of Hopeless.\\nDefend from a Distress while Panicked.","deck":"Brawler","artworkPath":"/stunts/base/fearless.png","locale":"en"},{"id":"stunt:pummel","family":"stunt","slug":"pummel","title":"Pummel","body":"Playing a Partial Success to attack an opponent while unarmed inflicts +1 Injury.","footer":"Knock out an opponent unarmed.","description":"Playing a Partial Success to attack an opponent while unarmed inflicts +1 Injury.\\nKnock out an opponent unarmed.","deck":"Brawler","artworkPath":"/stunts/base/pummel.png","locale":"en"},{"id":"stunt:flex","family":"stunt","slug":"flex","title":"Flex","body":"+1 Effect when using your body to impress or intimidate.","footer":"Impress or intimidate someone with your body.","description":"+1 Effect when using your body to impress or intimidate.\\nImpress or intimidate someone with your body.","deck":"Brawler","artworkPath":"/stunts/base/flex.png","locale":"en"},{"id":"stunt:oversizedWeaponry","family":"stunt","slug":"oversizedWeaponry","title":"Oversized Weaponry","body":"You can use oversized weapons. You can wield two-handed weapons in one hand.","footer":"Hit something with a weapon too large to wield easily.","description":"You can use oversized weapons. You can wield two-handed weapons in one hand.\\nHit something with a weapon too large to wield easily.","deck":"Brawler","artworkPath":"/stunts/base/oversized-weaponry.png","locale":"en"},{"id":"stunt:offensiveThrow","family":"stunt","slug":"offensiveThrow","title":"Offensive Throw","body":"You can throw characters of your size or smaller up to 1 zone away.","footer":"Throw something most people cannot throw.","description":"You can throw characters of your size or smaller up to 1 zone away.\\nThrow something most people cannot throw.","deck":"Brawler","artworkPath":"/stunts/base/offensive-throw.png","locale":"en"},{"id":"stunt:powerAttack","family":"stunt","slug":"powerAttack","title":"Power Attack","body":"Your melee attacks leave enemies open—they receive a Complication.","footer":"Strike an enemy so hard they stagger or fall.","description":"Your melee attacks leave enemies open—they receive a Complication.\\nStrike an enemy so hard they stagger or fall.","deck":"Brawler","artworkPath":"/stunts/base/power-attack.png","locale":"en"},{"id":"stunt:warCry","family":"stunt","slug":"warCry","title":"War Cry","body":"Play Success to intimidate all enemies in your zone, giving them 1 Distress.","footer":"Intimidate multiple opponents at once.","description":"Play Success to intimidate all enemies in your zone, giving them 1 Distress.\\nIntimidate multiple opponents at once.","deck":"Brawler","artworkPath":"/stunts/base/war-cry.png","locale":"en"},{"id":"stunt:grapple","family":"stunt","slug":"grapple","title":"Grapple","body":"When you successfully block a melee attack, you automatically grapple the attacker.","footer":"Restrain an enemy in close combat.","description":"When you successfully block a melee attack, you automatically grapple the attacker.\\nRestrain an enemy in close combat.","deck":"Brawler","artworkPath":"/stunts/base/grapple.png","locale":"en"},{"id":"stunt:chokeOut","family":"stunt","slug":"chokeOut","title":"Choke Out","body":"If you grapple an enemy for 2 consecutive turns, they lose consciousness.","footer":"Hold an opponent down until they submit or pass out.","description":"If you grapple an enemy for 2 consecutive turns, they lose consciousness.\\nHold an opponent down until they submit or pass out.","deck":"Brawler","artworkPath":"/stunts/base/choke-out.png","locale":"en"},{"id":"stunt:smash","family":"stunt","slug":"smash","title":"Smash","body":"You can split you melee attack Effect between enemies in the same zone.","footer":"Knock down 3 or more opponents with a single melee attack.","description":"You can split you melee attack Effect between enemies in the same zone.\\nKnock down 3 or more opponents with a single melee attack.","deck":"Brawler","artworkPath":"/stunts/base/smash.png","locale":"en"},{"id":"stunt:seductive","family":"stunt","slug":"seductive","title":"Seductive","body":"Receive 2x Boosts at the start of a social Encounter with a character that may find you attractive.","footer":"Seduce someone.","description":"Receive 2x Boosts at the start of a social Encounter with a character that may find you attractive.\\nSeduce someone.","deck":"Spy","artworkPath":"/stunts/base/seductive.png","locale":"en"},{"id":"stunt:elusive","family":"stunt","slug":"elusive","title":"Elusive","body":"Once per round, you can move to an adjacent zone when you defend from taking any Injury.","footer":"Retreat from a zone where you received an Injury.","description":"Once per round, you can move to an adjacent zone when you defend from taking any Injury.\\nRetreat from a zone where you received an Injury.","deck":"Spy","artworkPath":"/stunts/base/elusive.png","locale":"en"},{"id":"stunt:ghostStep","family":"stunt","slug":"ghostStep","title":"Ghost Step","body":"+1 Effect while moving silently.","footer":"Sneak past an enemy without being detected.","description":"+1 Effect while moving silently.\\nSneak past an enemy without being detected.","deck":"Spy","artworkPath":"/stunts/base/ghost-step.png","locale":"en"},{"id":"stunt:masterOfDisguise","family":"stunt","slug":"masterOfDisguise","title":"Master of Disguise","body":"+1 Effect when you assume a false identity.","footer":"Deceive someone by assuming a false identity.","description":"+1 Effect when you assume a false identity.\\nDeceive someone by assuming a false identity.","deck":"Spy","artworkPath":"/stunts/base/master-of-disguise.png","locale":"en"},{"id":"stunt:venomous","family":"stunt","slug":"venomous","title":"Venomous","body":"You can apply poison to a weapon and attack with it in 1 action. You don't poison yourself by mistake.","footer":"Poison someone.","description":"You can apply poison to a weapon and attack with it in 1 action. You don't poison yourself by mistake.\\nPoison someone.","deck":"Spy","artworkPath":"/stunts/base/venomous.png","locale":"en"},{"id":"stunt:forger","family":"stunt","slug":"forger","title":"Forger","body":"+1 Effect when manipulating with forged documents. The documents always hold up under casual inspection.","footer":"Deceive someone with a forged evidence.","description":"+1 Effect when manipulating with forged documents. The documents always hold up under casual inspection.\\nDeceive someone with a forged evidence.","deck":"Spy","artworkPath":"/stunts/base/forger.png","locale":"en"},{"id":"stunt:stalker","family":"stunt","slug":"stalker","title":"Stalker","body":"Your attacks deal +1 Injury or Distress to unaware enemies.","footer":"Knock-out or assassinate an unaware target in 1 action.","description":"Your attacks deal +1 Injury or Distress to unaware enemies.\\nKnock-out or assassinate an unaware target in 1 action.","deck":"Spy","artworkPath":"/stunts/base/stalker.png","locale":"en"},{"id":"stunt:safecracker","family":"stunt","slug":"safecracker","title":"Safecracker","body":"+1 Effect when braking into or out of locked places or containers.","footer":"Break a lock.","description":"+1 Effect when braking into or out of locked places or containers.\\nBreak a lock.","deck":"Spy","artworkPath":"/stunts/base/safecracker.png","locale":"en"},{"id":"stunt:pickpocket","family":"stunt","slug":"pickpocket","title":"Pickpocket","body":"When you play a Success or better to pickpocket someone, you get an extra asset.","footer":"Steal an item from a person without them noticing.","description":"When you play a Success or better to pickpocket someone, you get an extra asset.\\nSteal an item from a person without them noticing.","deck":"Spy","artworkPath":"/stunts/base/pickpocket.png","locale":"en"},{"id":"stunt:stagedAccident","family":"stunt","slug":"stagedAccident","title":"Staged Accident","body":"+1 Effect when hurting someone indirectly.","footer":"Kill or knock-out someone indirectly.","description":"+1 Effect when hurting someone indirectly.\\nKill or knock-out someone indirectly.","deck":"Spy","artworkPath":"/stunts/base/staged-accident.png","locale":"en"},{"id":"stunt:hiddenArsenal","family":"stunt","slug":"hiddenArsenal","title":"Hidden Arsenal","body":"Once per scene, reveal a hidden weapon to attack with +2 Effect.","footer":"Smuggle a weapon somewhere.","description":"Once per scene, reveal a hidden weapon to attack with +2 Effect.\\nSmuggle a weapon somewhere.","deck":"Spy","artworkPath":"/stunts/base/hidden-arsenal.png","locale":"en"},{"id":"stunt:rallyingCall","family":"stunt","slug":"rallyingCall","title":"Rallying Call","body":"Play a Success to allow all allies that can hear you to discard a Complication or receive a Boost.","footer":"Boost an ally.","description":"Play a Success to allow all allies that can hear you to discard a Complication or receive a Boost.\\nBoost an ally.","deck":"Ranger","artworkPath":"/stunts/base/rallying-call.png","locale":"en"},{"id":"stunt:forager","family":"stunt","slug":"forager","title":"Forager","body":"You get 2x the food when foraging.","footer":"Forage some food.","description":"You get 2x the food when foraging.\\nForage some food.","deck":"Ranger","artworkPath":"/stunts/base/forager.png","locale":"en"},{"id":"stunt:tracker","family":"stunt","slug":"tracker","title":"Tracker","body":"+1 Effect while tracking.","footer":"Find someone you are tracking.","description":"+1 Effect while tracking.\\nFind someone you are tracking.","deck":"Ranger","artworkPath":"/stunts/base/tracker.png","locale":"en"},{"id":"stunt:camouflage","family":"stunt","slug":"camouflage","title":"Camouflage","body":"Your camouflage always holds up unless inspected.","footer":"Camouflaging yourself from an enemy for 3 rounds.","description":"Your camouflage always holds up unless inspected.\\nCamouflaging yourself from an enemy for 3 rounds.","deck":"Ranger","artworkPath":"/stunts/base/camouflage.png","locale":"en"},{"id":"stunt:hunter","family":"stunt","slug":"hunter","title":"Hunter","body":"Hitting an enemy without an Injury inflicts +1 Injury.","footer":"Knock-out or kill an enemy with one shot.","description":"Hitting an enemy without an Injury inflicts +1 Injury.\\nKnock-out or kill an enemy with one shot.","deck":"Ranger","artworkPath":"/stunts/base/hunter.png","locale":"en"},{"id":"stunt:animalTrainer","family":"stunt","slug":"animalTrainer","title":"Animal Trainer","body":"Play a Special Action to teach your pet a new trick.","footer":"Make an animal follow your command.","description":"Play a Special Action to teach your pet a new trick.\\nMake an animal follow your command.","deck":"Ranger","artworkPath":"/stunts/base/animal-trainer.png","locale":"en"},{"id":"stunt:trapper","family":"stunt","slug":"trapper","title":"Trapper","body":"Your traps don't hurt you or your allies.","footer":"Make a trap and capture an enemy or an animal in it.","description":"Your traps don't hurt you or your allies.\\nMake a trap and capture an enemy or an animal in it.","deck":"Ranger","artworkPath":"/stunts/base/trapper.png","locale":"en"},{"id":"stunt:marksman","family":"stunt","slug":"marksman","title":"Marksman","body":"You can shoot ranged weapons 1 zone further.","footer":"Hit a target 3 zones away.","description":"You can shoot ranged weapons 1 zone further.\\nHit a target 3 zones away.","deck":"Ranger","artworkPath":"/stunts/base/marksman.png","locale":"en"},{"id":"stunt:weaponMaintenance","family":"stunt","slug":"weaponMaintenance","title":"Weapon Maintenance","body":"Weapons never break or jam when you use them.","footer":"Repair a broken weapon.","description":"Weapons never break or jam when you use them.\\nRepair a broken weapon.","deck":"Ranger","artworkPath":"/stunts/base/weapon-maintenance.png","locale":"en"},{"id":"stunt:penetration","family":"stunt","slug":"penetration","title":"Penetration","body":"You can apply extra ranged Injury left after defeating an enemy to another enemy in the same zone.","footer":"Hurt two enemies with one shot.","description":"You can apply extra ranged Injury left after defeating an enemy to another enemy in the same zone.\\nHurt two enemies with one shot.","deck":"Ranger","artworkPath":"/stunts/base/penetration.png","locale":"en"},{"id":"stunt:survivor","family":"stunt","slug":"survivor","title":"Survivor","body":"You get +1 Effect when dealing with natural hazards.","footer":"Survive a natural hazard without consequences.","description":"You get +1 Effect when dealing with natural hazards.\\nSurvive a natural hazard without consequences.","deck":"Ranger","artworkPath":"/stunts/base/survivor.png","locale":"en"},{"id":"stunt:animalFriend","family":"stunt","slug":"animalFriend","title":"Animal Friend","body":"+1 Effect when handling animals.","footer":"Calm down an aggressive animal.","description":"+1 Effect when handling animals.\\nCalm down an aggressive animal.","deck":"Ranger","artworkPath":"/stunts/base/animal-friend.png","locale":"en"},{"id":"stunt:strategist","family":"stunt","slug":"strategist","title":"Strategist","body":"Your Outcome card hand limit is increased by 1.","footer":"Reach a +4 Effect on your action.","description":"Your Outcome card hand limit is increased by 1.\\nReach a +4 Effect on your action.","deck":"Scholar","artworkPath":"/stunts/base/strategist.png","locale":"en"},{"id":"stunt:volatileMastery","family":"stunt","slug":"volatileMastery","title":"Volatile Mastery","body":"You never hit yourself with your own explosives.","footer":"Blow something up.","description":"You never hit yourself with your own explosives.\\nBlow something up.","deck":"Scholar","artworkPath":"/stunts/base/volatile-mastery.png","locale":"en"},{"id":"stunt:linguist","family":"stunt","slug":"linguist","title":"Linguist","body":"+1 Effect when decoding or translating. You can always recognize a language by text or speech.","footer":"Gain a clue by studying a text document.","description":"+1 Effect when decoding or translating. You can always recognize a language by text or speech.\\nGain a clue by studying a text document.","deck":"Scholar","artworkPath":"/stunts/base/linguist.png","locale":"en"},{"id":"stunt:historian","family":"stunt","slug":"historian","title":"Historian","body":"You always know 1 useful fact about any historical site, artifact, or tradition relevant to your setting.","footer":"Recall or uncover a historical event.","description":"You always know 1 useful fact about any historical site, artifact, or tradition relevant to your setting.\\nRecall or uncover a historical event.","deck":"Scholar","artworkPath":"/stunts/base/historian.png","locale":"en"},{"id":"stunt:botanist","family":"stunt","slug":"botanist","title":"Botanist","body":"You automatically recognize common plants. You receive +1 Effect when using plants for medicine, poison, or alchemy.","footer":"Identify a rare or useful plant in the wild.","description":"You automatically recognize common plants. You receive +1 Effect when using plants for medicine, poison, or alchemy.\\nIdentify a rare or useful plant in the wild.","deck":"Scholar","artworkPath":"/stunts/base/botanist.png","locale":"en"},{"id":"stunt:chemist","family":"stunt","slug":"chemist","title":"Chemist","body":"Chemicals you craft have +1 Effect or +1 round duration.","footer":"Create an effective potion, poison, or explosive compound.","description":"Chemicals you craft have +1 Effect or +1 round duration.\\nCreate an effective potion, poison, or explosive compound.","deck":"Scholar","artworkPath":"/stunts/base/chemist.png","locale":"en"},{"id":"stunt:tinkerer","family":"stunt","slug":"tinkerer","title":"Tinkerer","body":"You don't need specialized tools when repairing or crafting.","footer":"Repair or modify a device to serve an unintended purpose.","description":"You don't need specialized tools when repairing or crafting.\\nRepair or modify a device to serve an unintended purpose.","deck":"Scholar","artworkPath":"/stunts/base/tinkerer.png","locale":"en"},{"id":"stunt:physician","family":"stunt","slug":"physician","title":"Physician","body":"+1 Effect when treating Injuries and diseases outside battle.","footer":"Treat a diseased person.","description":"+1 Effect when treating Injuries and diseases outside battle.\\nTreat a diseased person.","deck":"Scholar","artworkPath":"/stunts/base/physician.png","locale":"en"},{"id":"stunt:inventor","family":"stunt","slug":"inventor","title":"Inventor","body":"Play a Special Action to invent a gadget tailored to the current situation. Destroy a non-consumable item for a +1 Effect.","footer":"Design and build a completely new tool or device.","description":"Play a Special Action to invent a gadget tailored to the current situation. Destroy a non-consumable item for a +1 Effect.\\nDesign and build a completely new tool or device.","deck":"Scholar","artworkPath":"/stunts/base/inventor.png","locale":"en"},{"id":"stunt:academic","family":"stunt","slug":"academic","title":"Academic","body":"Play Partial Success to give an ally a Boost and discard a Complication.","footer":"Teach an ally a new skill.","description":"Play Partial Success to give an ally a Boost and discard a Complication.\\nTeach an ally a new skill.","deck":"Scholar","artworkPath":"/stunts/base/academic.png","locale":"en"},{"id":"stunt:powerfulRhetoric","family":"stunt","slug":"powerfulRhetoric","title":"Powerful Rhetoric","body":"Playing a Partial Success when persuading or debating counts as a Success.","footer":"Make a speech.","description":"Playing a Partial Success when persuading or debating counts as a Success.\\nMake a speech.","deck":"Scholar","artworkPath":"/stunts/base/powerful-rhetoric.png","locale":"en"},{"id":"stunt:medic","family":"stunt","slug":"medic","title":"Medic","body":"+1 Effect when treating Injuries in battle.","footer":"Revive a fallen ally.","description":"+1 Effect when treating Injuries in battle.\\nRevive a fallen ally.","deck":"Scholar","artworkPath":"/stunts/base/medic.png","locale":"en"},{"id":"stunt:foresight","family":"stunt","slug":"foresight","title":"Foresight","body":"Receive a clue from the Storyteller in exchange for 2x Distress.","footer":"Fortell something.","description":"Receive a clue from the Storyteller in exchange for 2x Distress.\\nFortell something.","deck":"Mystic","artworkPath":"/stunts/base/foresight.png","locale":"en"},{"id":"stunt:senseDanger","family":"stunt","slug":"senseDanger","title":"Sense Danger","body":"You receive +1 Effect when trying to notice ambushes, traps, or hidden dangers.","footer":"Detect an unseen threat before it strikes.","description":"You receive +1 Effect when trying to notice ambushes, traps, or hidden dangers.\\nDetect an unseen threat before it strikes.","deck":"Mystic","artworkPath":"/stunts/base/sense-danger.png","locale":"en"},{"id":"stunt:readEmotions","family":"stunt","slug":"readEmotions","title":"Read Emotions","body":"Play a Success to detect underlying emotions of a character.","footer":"Call out a liar.","description":"Play a Success to detect underlying emotions of a character.\\nCall out a liar.","deck":"Mystic","artworkPath":"/stunts/base/read-emotions.png","locale":"en"},{"id":"stunt:markAnOmen","family":"stunt","slug":"markAnOmen","title":"Mark an Omen","body":"Play a Success to make all enemies in the same zone gain 1 Distress.","footer":"Act on a superstition.","description":"Play a Success to make all enemies in the same zone gain 1 Distress.\\nAct on a superstition.","deck":"Mystic","artworkPath":"/stunts/base/mark-an-omen.png","locale":"en"},{"id":"stunt:genusLoci","family":"stunt","slug":"genusLoci","title":"Genus Loci","body":"Play a Success to glimpse into an object or location’s past and learn a hidden truth.","footer":"Connect with a place or object's lingering essence.","description":"Play a Success to glimpse into an object or location’s past and learn a hidden truth.\\nConnect with a place or object's lingering essence.","deck":"Mystic","artworkPath":"/stunts/base/genus-loci.png","locale":"en"},{"id":"stunt:guideEmotions","family":"stunt","slug":"guideEmotions","title":"Guide Emotions","body":"+1 Effect when trying to calm someone down.","footer":"Talk someone down from attacking you.","description":"+1 Effect when trying to calm someone down.\\nTalk someone down from attacking you.","deck":"Mystic","artworkPath":"/stunts/base/guide-emotions.png","locale":"en"},{"id":"stunt:crowdControl","family":"stunt","slug":"crowdControl","title":"Crowd Control","body":"Play a Special Action to control command a crowd, calming, riling up, or directing them.","footer":"Sway a crowd to obey you.","description":"Play a Special Action to control command a crowd, calming, riling up, or directing them.\\nSway a crowd to obey you.","deck":"Mystic","artworkPath":"/stunts/base/crowd-control.png","locale":"en"},{"id":"stunt:bless","family":"stunt","slug":"bless","title":"Bless","body":"Once per scene, play a Success to remove a status card other than Injury from an ally.","footer":"Bless someone.","description":"Once per scene, play a Success to remove a status card other than Injury from an ally.\\nBless someone.","deck":"Mystic","artworkPath":"/stunts/base/bless.png","locale":"en"},{"id":"stunt:circleOfProtection","family":"stunt","slug":"circleOfProtection","title":"Circle of Protection","body":"Once per session, play a Success to shield yourself and allies in your zone from the next hostile action.","footer":"Create a protective boundary.","description":"Once per session, play a Success to shield yourself and allies in your zone from the next hostile action.\\nCreate a protective boundary.","deck":"Mystic","artworkPath":"/stunts/base/circle-of-protection.png","locale":"en"},{"id":"actor-base:animal_blue","family":"actor-base","slug":"animal_blue","title":"Animal Blue","artworkPath":"/actors/base/animal-blue.png","locale":"en"},{"id":"actor-base:animal_green","family":"actor-base","slug":"animal_green","title":"Animal Green","artworkPath":"/actors/base/animal-green.png","locale":"en"},{"id":"actor-base:animal_red","family":"actor-base","slug":"animal_red","title":"Animal Red","artworkPath":"/actors/base/animal-red.png","locale":"en"},{"id":"actor-base:animal_yellow","family":"actor-base","slug":"animal_yellow","title":"Animal Yellow","artworkPath":"/actors/base/animal-yellow.png","locale":"en"},{"id":"actor-base:aristocrat","family":"actor-base","slug":"aristocrat","title":"Aristocrat","artworkPath":"/actors/base/aristocrat.png","locale":"en"},{"id":"actor-base:artillery_acid","family":"actor-base","slug":"artillery_acid","title":"Artillery Acid","artworkPath":"/actors/base/artillery-acid.png","locale":"en"},{"id":"actor-base:artillery_earth","family":"actor-base","slug":"artillery_earth","title":"Artillery Earth","artworkPath":"/actors/base/artillery-earth.png","locale":"en"},{"id":"actor-base:artillery_fire","family":"actor-base","slug":"artillery_fire","title":"Artillery Fire","artworkPath":"/actors/base/artillery-fire.png","locale":"en"},{"id":"actor-base:artillery_ice","family":"actor-base","slug":"artillery_ice","title":"Artillery Ice","artworkPath":"/actors/base/artillery-ice.png","locale":"en"},{"id":"actor-base:artillery_lightning","family":"actor-base","slug":"artillery_lightning","title":"Artillery Lightning","artworkPath":"/actors/base/artillery-lightning.png","locale":"en"},{"id":"actor-base:assassin","family":"actor-base","slug":"assassin","title":"Assassin","artworkPath":"/actors/base/assassin.png","locale":"en"},{"id":"actor-base:beast","family":"actor-base","slug":"beast","title":"Beast","artworkPath":"/actors/base/beast.png","locale":"en"},{"id":"actor-base:bruiser_blue","family":"actor-base","slug":"bruiser_blue","title":"Bruiser Blue","artworkPath":"/actors/base/bruiser-blue.png","locale":"en"},{"id":"actor-base:bruiser_green","family":"actor-base","slug":"bruiser_green","title":"Bruiser Green","artworkPath":"/actors/base/bruiser-green.png","locale":"en"},{"id":"actor-base:bruiser_red","family":"actor-base","slug":"bruiser_red","title":"Bruiser Red","artworkPath":"/actors/base/bruiser-red.png","locale":"en"},{"id":"actor-base:bruiser_yellow","family":"actor-base","slug":"bruiser_yellow","title":"Bruiser Yellow","artworkPath":"/actors/base/bruiser-yellow.png","locale":"en"},{"id":"actor-base:civilian","family":"actor-base","slug":"civilian","title":"Civilian","artworkPath":"/actors/base/civilian.png","locale":"en"},{"id":"actor-base:claw_blue","family":"actor-base","slug":"claw_blue","title":"Claw Blue","artworkPath":"/actors/base/claw-blue.png","locale":"en"},{"id":"actor-base:claw_green","family":"actor-base","slug":"claw_green","title":"Claw Green","artworkPath":"/actors/base/claw-green.png","locale":"en"},{"id":"actor-base:claw_red","family":"actor-base","slug":"claw_red","title":"Claw Red","artworkPath":"/actors/base/claw-red.png","locale":"en"},{"id":"actor-base:claw_yellow","family":"actor-base","slug":"claw_yellow","title":"Claw Yellow","artworkPath":"/actors/base/claw-yellow.png","locale":"en"},{"id":"actor-base:cog","family":"actor-base","slug":"cog","title":"Cog","artworkPath":"/actors/base/cog.png","locale":"en"},{"id":"actor-base:commander","family":"actor-base","slug":"commander","title":"Commander","artworkPath":"/actors/base/commander.png","locale":"en"},{"id":"actor-base:construct","family":"actor-base","slug":"construct","title":"Construct","artworkPath":"/actors/base/construct.png","locale":"en"},{"id":"actor-base:guard_blue","family":"actor-base","slug":"guard_blue","title":"Guard Blue","artworkPath":"/actors/base/guard-blue.png","locale":"en"},{"id":"actor-base:guard_green","family":"actor-base","slug":"guard_green","title":"Guard Green","artworkPath":"/actors/base/guard-green.png","locale":"en"},{"id":"actor-base:guard_red","family":"actor-base","slug":"guard_red","title":"Guard Red","artworkPath":"/actors/base/guard-red.png","locale":"en"},{"id":"actor-base:guard_yellow","family":"actor-base","slug":"guard_yellow","title":"Guard Yellow","artworkPath":"/actors/base/guard-yellow.png","locale":"en"},{"id":"actor-base:healer","family":"actor-base","slug":"healer","title":"Healer","artworkPath":"/actors/base/healer.png","locale":"en"},{"id":"actor-base:horror","family":"actor-base","slug":"horror","title":"Horror","artworkPath":"/actors/base/horror.png","locale":"en"},{"id":"actor-base:manipulator","family":"actor-base","slug":"manipulator","title":"Manipulator","artworkPath":"/actors/base/manipulator.png","locale":"en"},{"id":"actor-base:marksman_blue","family":"actor-base","slug":"marksman_blue","title":"Marksman Blue","artworkPath":"/actors/base/marksman-blue.png","locale":"en"},{"id":"actor-base:marksman_green","family":"actor-base","slug":"marksman_green","title":"Marksman Green","artworkPath":"/actors/base/marksman-green.png","locale":"en"},{"id":"actor-base:marksman_red","family":"actor-base","slug":"marksman_red","title":"Marksman Red","artworkPath":"/actors/base/marksman-red.png","locale":"en"},{"id":"actor-base:marksman_yellow","family":"actor-base","slug":"marksman_yellow","title":"Marksman Yellow","artworkPath":"/actors/base/marksman-yellow.png","locale":"en"},{"id":"actor-base:merchant","family":"actor-base","slug":"merchant","title":"Merchant","artworkPath":"/actors/base/merchant.png","locale":"en"},{"id":"actor-base:minion_blue","family":"actor-base","slug":"minion_blue","title":"Minion Blue","artworkPath":"/actors/base/minion-blue.png","locale":"en"},{"id":"actor-base:minion_green","family":"actor-base","slug":"minion_green","title":"Minion Green","artworkPath":"/actors/base/minion-green.png","locale":"en"},{"id":"actor-base:minion_red","family":"actor-base","slug":"minion_red","title":"Minion Red","artworkPath":"/actors/base/minion-red.png","locale":"en"},{"id":"actor-base:minion_yellow","family":"actor-base","slug":"minion_yellow","title":"Minion Yellow","artworkPath":"/actors/base/minion-yellow.png","locale":"en"},{"id":"actor-base:sentry","family":"actor-base","slug":"sentry","title":"Sentry","artworkPath":"/actors/base/sentry.png","locale":"en"},{"id":"actor-base:specialist","family":"actor-base","slug":"specialist","title":"Specialist","artworkPath":"/actors/base/specialist.png","locale":"en"},{"id":"actor-base:swarm","family":"actor-base","slug":"swarm","title":"Swarm","artworkPath":"/actors/base/swarm.png","locale":"en"},{"id":"actor-base:zealot","family":"actor-base","slug":"zealot","title":"Zealot","artworkPath":"/actors/base/zealot.png","locale":"en"},{"id":"actor-role:pawn","family":"actor-role","slug":"pawn","title":"Pawn","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 1. Move 1 zone. Melee: 1 Injury. Ranged: 1 Injury, range 1."},{"id":"actor-role:minion","family":"actor-role","slug":"minion","title":"Minion","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Melee: 1 Injury. Ranged: 1 Injury, range 1-2."},{"id":"actor-role:thug","family":"actor-role","slug":"thug","title":"Thug","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Melee: 2 Injuries. Ranged: 1 Injury, range 1."},{"id":"actor-role:brute","family":"actor-role","slug":"brute","title":"Brute","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 3. Move 1 zone. Melee: 2 Injuries. Melee: 1 Injury, splash."},{"id":"actor-role:tank","family":"actor-role","slug":"tank","title":"Tank","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 6. Move 1 zone. Melee: 2 Injuries. Direct: Push, range 1, splash."},{"id":"actor-role:champion","family":"actor-role","slug":"champion","title":"Champion","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 4. Move 1 zone. Melee: 3 Injuries. Direct: 2 Distress, splash."},{"id":"actor-role:assassin","family":"actor-role","slug":"assassin","title":"Assassin","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Melee: 4 Injuries. Direct: 2 Complications, splash."},{"id":"actor-role:skirmisher","family":"actor-role","slug":"skirmisher","title":"Skirmisher","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Melee: 2 attacks, 1 Injury each. Ranged: 2 attacks, 1 Injury each, range 1-2."},{"id":"actor-role:ranger","family":"actor-role","slug":"ranger","title":"Ranger","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 3. Move 1 zone. Ranged: 2 Injuries, range 1-2. Melee: 2 Injuries."},{"id":"actor-role:stalker","family":"actor-role","slug":"stalker","title":"Stalker","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Melee: 3 Injuries. Ranged: 3 Injuries, range 1-2."},{"id":"actor-role:commando","family":"actor-role","slug":"commando","title":"Commando","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 3. Move 1 zone. Melee: 3 Injuries. Ranged: 3 attacks, 1 Injury each, range 1-2."},{"id":"actor-role:marksman","family":"actor-role","slug":"marksman","title":"Marksman","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Ranged: 3 Injuries, range 1-3. Melee: 1 Injury."},{"id":"actor-role:sniper","family":"actor-role","slug":"sniper","title":"Sniper","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Ranged: 4 Injuries, range 1 or more. Melee: 1 Injury."},{"id":"actor-role:grenadier","family":"actor-role","slug":"grenadier","title":"Grenadier","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Ranged: 2 Injuries, range 1, splash. Melee: 1 Injury."},{"id":"actor-role:bomber","family":"actor-role","slug":"bomber","title":"Bomber","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 3. Move 1 zone. Ranged: 3 Injuries, range 0, splash."},{"id":"actor-role:artillery","family":"actor-role","slug":"artillery","title":"Artillery","artworkPath":"/types/actor.png","locale":"en","description":"Toughness 2. Move 1 zone. Ranged: 2 Injuries, range 1 or more, splash."},{"id":"actor-special:tough","family":"actor-special","slug":"tough","title":"Tough","artworkPath":"/actors/base/tough.png","locale":"en","description":"+2 Toughness."},{"id":"actor-special:shielded","family":"actor-special","slug":"shielded","title":"Shielded","artworkPath":"/actors/base/shielded.png","locale":"en","description":"-1 Injury taken."},{"id":"actor-special:armoured","family":"actor-special","slug":"armoured","title":"Armoured","artworkPath":"/actors/base/armoured.png","locale":"en","description":"-2 Injuries taken."},{"id":"actor-special:alpha","family":"actor-special","slug":"alpha","title":"Alpha","artworkPath":"/actors/base/alpha.png","locale":"en","description":"+1 Toughness and +1 Injury for all attacks."},{"id":"actor-special:dangerous","family":"actor-special","slug":"dangerous","title":"Dangerous","artworkPath":"/actors/base/dangerous.png","locale":"en","description":"Primary attack also deals +1 Injury."},{"id":"actor-special:burning","family":"actor-special","slug":"burning","title":"Burning","artworkPath":"/actors/base/burning.png","locale":"en","description":"Primary attack also deals +1 Burning."},{"id":"actor-special:fiery","family":"actor-special","slug":"fiery","title":"Fiery","artworkPath":"/actors/base/fiery.png","locale":"en","description":"Secondary attack deals Burning instead."},{"id":"actor-special:freezing","family":"actor-special","slug":"freezing","title":"Freezing","artworkPath":"/actors/base/freezing.png","locale":"en","description":"Primary attack also deals +1 Freezing."},{"id":"actor-special:icy","family":"actor-special","slug":"icy","title":"Icy","artworkPath":"/actors/base/icy.png","locale":"en","description":"Secondary attack deals Freezing instead."},{"id":"actor-special:irritating","family":"actor-special","slug":"irritating","title":"Irritating","artworkPath":"/actors/base/irritating.png","locale":"en","description":"Primary attack also deals +1 Distress."},{"id":"actor-special:corrupting","family":"actor-special","slug":"corrupting","title":"Corrupting","artworkPath":"/actors/base/corrupting.png","locale":"en","description":"Secondary attack deals Distress instead."},{"id":"actor-special:fast","family":"actor-special","slug":"fast","title":"Fast","artworkPath":"/actors/base/fast.png","locale":"en","description":"Moves an extra zone per turn."},{"id":"actor-special:harassing","family":"actor-special","slug":"harassing","title":"Harassing","artworkPath":"/actors/base/harassing.png","locale":"en","description":"Secondary attack also deals +1 Complication."},{"id":"actor-special:slowing","family":"actor-special","slug":"slowing","title":"Slowing","artworkPath":"/actors/base/slowing.png","locale":"en","description":"Secondary attack also deals +1 Hindered."},{"id":"actor-special:elemental","family":"actor-special","slug":"elemental","title":"Elemental","artworkPath":"/actors/base/elemental.png","locale":"en","description":"All attacks can deal Freezing or Burning."},{"id":"actor-special:charging","family":"actor-special","slug":"charging","title":"Charging","artworkPath":"/actors/base/charging.png","locale":"en","description":"Primary attack also deals +2 Injuries when entering a zone."},{"id":"actor-special:suicide","family":"actor-special","slug":"suicide","title":"Suicide","artworkPath":"/actors/base/suicide.png","locale":"en","description":"Can die and deal 2 Injuries, splash."},{"id":"actor-special:grabbing","family":"actor-special","slug":"grabbing","title":"Grabbing","artworkPath":"/actors/base/grabbing.png","locale":"en","description":"Melee attacks also deal +1 Stuck."},{"id":"actor-special:webbing","family":"actor-special","slug":"webbing","title":"Webbing","artworkPath":"/actors/base/webbing.png","locale":"en","description":"Primary attack also deals +1 Stuck, splash."},{"id":"actor-special:reaching","family":"actor-special","slug":"reaching","title":"Reaching","artworkPath":"/actors/base/reaching.png","locale":"en","description":"Melee attacks reach adjacent zones."},{"id":"actor-special:healing","family":"actor-special","slug":"healing","title":"Healing","artworkPath":"/actors/base/healing.png","locale":"en","description":"Heal 2 Injuries from one ally in the zone."},{"id":"actor-special:restoring","family":"actor-special","slug":"restoring","title":"Restoring","artworkPath":"/actors/base/restoring.png","locale":"en","description":"Heal 1 Injury from all allies in the zone."},{"id":"actor-special:regenerating","family":"actor-special","slug":"regenerating","title":"Regenerating","artworkPath":"/actors/base/regenerating.png","locale":"en","description":"Heal 2 Injuries at the end of the turn."},{"id":"actor-special:encouraging","family":"actor-special","slug":"encouraging","title":"Encouraging","artworkPath":"/actors/base/encouraging.png","locale":"en","description":"Boost all allies in the zone."},{"id":"asset-base:medieval_gambeson","family":"asset-base","slug":"medieval_gambeson","title":"Gambeson","body":"Light fabric armor. Negates 1 Injury from slashing damage.","description":"Light fabric armor. Negates 1 Injury from slashing damage.","deck":"medieval","artworkPath":"/assets/medieval/gambeson.png","locale":"en"},{"id":"asset-base:medieval_chainmail","family":"asset-base","slug":"medieval_chainmail","title":"Chainmail","body":"Medium metal armor. Negates 1 Injury from slashing and piercing damage. -1 Effect when sneaking, running, climbing or swimming.","description":"Medium metal armor. Negates 1 Injury from slashing and piercing damage. -1 Effect when sneaking, running, climbing or swimming.","deck":"medieval","artworkPath":"/assets/medieval/chainmail.png","locale":"en"},{"id":"asset-base:medieval_plate_armor","family":"asset-base","slug":"medieval_plate_armor","title":"Plate Armor","body":"Heavy metal armor. Negates 2 slashing/piercing Injuries and 1 bludgeoning Injury. -2 Effect when sneaking, running, climbing or swimming.","description":"Heavy metal armor. Negates 2 slashing/piercing Injuries and 1 bludgeoning Injury. -2 Effect when sneaking, running, climbing or swimming.","deck":"medieval","artworkPath":"/assets/medieval/plate-armor.png","locale":"en"},{"id":"asset-base:medieval_buckler","family":"asset-base","slug":"medieval_buckler","title":"Buckler","body":"Light metal shield. +1 Effect when defending from melee attack once per round.","description":"Light metal shield. +1 Effect when defending from melee attack once per round.","deck":"medieval","artworkPath":"/assets/medieval/buckler.png","locale":"en"},{"id":"asset-base:medieval_kite-shield","family":"asset-base","slug":"medieval_kite-shield","title":"Kite Shield","body":"Large wooden shield. +1 Effect when defending from melee or ranged attack. -1 Effect when sneaking, running, climbing or swimming.","description":"Large wooden shield. +1 Effect when defending from melee or ranged attack. -1 Effect when sneaking, running, climbing or swimming.","deck":"medieval","artworkPath":"/assets/medieval/kite-shield.png","locale":"en"},{"id":"asset-base:medieval_dagger","family":"asset-base","slug":"medieval_dagger","title":"Dagger","body":"A light one-handed piercing melee weapon. Can be thrown 1 zone away.","description":"A light one-handed piercing melee weapon. Can be thrown 1 zone away.","deck":"medieval","artworkPath":"/assets/medieval/dagger.png","locale":"en"},{"id":"asset-base:medieval_hand_axe","family":"asset-base","slug":"medieval_hand_axe","title":"Hand Axe","body":"A light one-handed slashing melee weapon. Can be thrown 1 zone away.","description":"A light one-handed slashing melee weapon. Can be thrown 1 zone away.","deck":"medieval","artworkPath":"/assets/medieval/hand-axe.png","locale":"en"},{"id":"asset-base:medieval_longsword","family":"asset-base","slug":"medieval_longsword","title":"Longsword","body":"A medium one- or two-handed piercing or slashing melee weapon. +1 Effect when attacking while wielded with both hands.","description":"A medium one- or two-handed piercing or slashing melee weapon. +1 Effect when attacking while wielded with both hands.","deck":"medieval","artworkPath":"/assets/medieval/longsword.png","locale":"en"},{"id":"asset-base:medieval_zweihandler","family":"asset-base","slug":"medieval_zweihandler","title":"Zweihänder","body":"A heavy two-handed slashing melee weapon. +1 Effect when attacking.","description":"A heavy two-handed slashing melee weapon. +1 Effect when attacking.","deck":"medieval","artworkPath":"/assets/medieval/zweihandler.png","locale":"en"},{"id":"asset-base:medieval_great_axe","family":"asset-base","slug":"medieval_great_axe","title":"Greataxe","body":"A heavy two-handed slashing melee weapon. +2 Effect when attacking multiple enemies.","description":"A heavy two-handed slashing melee weapon. +2 Effect when attacking multiple enemies.","deck":"medieval","artworkPath":"/assets/medieval/great-axe.png","locale":"en"},{"id":"asset-base:medieval_war_hammer","family":"asset-base","slug":"medieval_war_hammer","title":"War Hammer","body":"A heavy two-handed piercing or bludgeoning melee weapon. +1 Effect against armor.","description":"A heavy two-handed piercing or bludgeoning melee weapon. +1 Effect against armor.","deck":"medieval","artworkPath":"/assets/medieval/war-hammer.png","locale":"en"},{"id":"asset-base:medieval_mace","family":"asset-base","slug":"medieval_mace","title":"Mace","body":"A medium one-handed bludgeoning melee weapon. 1 Injury negated by armor turns to Distress instead.","description":"A medium one-handed bludgeoning melee weapon. 1 Injury negated by armor turns to Distress instead.","deck":"medieval","artworkPath":"/assets/medieval/mace.png","locale":"en"},{"id":"asset-base:medieval_morningstar","family":"asset-base","slug":"medieval_morningstar","title":"Morningstar","body":"A medium one-handed bludgeoning melee weapon. Ignores shields.","description":"A medium one-handed bludgeoning melee weapon. Ignores shields.","deck":"medieval","artworkPath":"/assets/medieval/morningstar.png","locale":"en"},{"id":"asset-base:medieval_staff","family":"asset-base","slug":"medieval_staff","title":"Staff","body":"A light two-handed bludgeoning melee polearm weapon. +1 Effect when tripping an enemy.","description":"A light two-handed bludgeoning melee polearm weapon. +1 Effect when tripping an enemy.","deck":"medieval","artworkPath":"/assets/medieval/staff.png","locale":"en"},{"id":"asset-base:medieval_spear","family":"asset-base","slug":"medieval_spear","title":"Spear","body":"A medium two-handed piercing melee polearm weapon. Once per round outside your turn you can attack an enemy entering your zone.","description":"A medium two-handed piercing melee polearm weapon. Once per round outside your turn you can attack an enemy entering your zone.","deck":"medieval","artworkPath":"/assets/medieval/spear.png","locale":"en"},{"id":"asset-base:medieval_billhook","family":"asset-base","slug":"medieval_billhook","title":"Billhook","body":"A heavy two-handed piercing or slashing polearm weapon. +1 Effect against cavalry.","description":"A heavy two-handed piercing or slashing polearm weapon. +1 Effect against cavalry.","deck":"medieval","artworkPath":"/assets/medieval/billhook.png","locale":"en"},{"id":"asset-base:medieval_hunting_bow","family":"asset-base","slug":"medieval_hunting_bow","title":"Hunting Bow","body":"A light two-handed ranged weapon. Range: 1-2 zones away. -1 Effect when shooting targets in the same zone.","description":"A light two-handed ranged weapon. Range: 1-2 zones away. -1 Effect when shooting targets in the same zone.","deck":"medieval","artworkPath":"/assets/medieval/hunting-bow.png","locale":"en"},{"id":"asset-base:medieval_crossbow","family":"asset-base","slug":"medieval_crossbow","title":"Crossbow","body":"A heavy two-handed ranged weapon. Range: 1-2 zones. Ignores Plate Armor. -1 Effect when shooting targets in the same zone.","description":"A heavy two-handed ranged weapon. Range: 1-2 zones. Ignores Plate Armor. -1 Effect when shooting targets in the same zone.","deck":"medieval","artworkPath":"/assets/medieval/crossbow.png","locale":"en"},{"id":"asset-base:medieval_hand_cannon","family":"asset-base","slug":"medieval_hand_cannon","title":"Hand-Cannon","body":"A heavy two-handed ranged weapon. Range: 0-2 zones away. Play 2 Outcome cards over 2 turns to load and fire. Add the Effect together.","description":"A heavy two-handed ranged weapon. Range: 0-2 zones away. Play 2 Outcome cards over 2 turns to load and fire. Add the Effect together.","deck":"medieval","artworkPath":"/assets/medieval/hand-cannon.png","locale":"en"},{"id":"asset-base:medieval_riding_horse","family":"asset-base","slug":"medieval_riding_horse","title":"Riding Horse","body":"Can move 2 zones per turn. +1 Effect when attacking infantry on horseback.","description":"Can move 2 zones per turn. +1 Effect when attacking infantry on horseback.","deck":"medieval","artworkPath":"/assets/medieval/riding-horse.png","locale":"en"},{"id":"asset-base:medieval_wagon","family":"asset-base","slug":"medieval_wagon","title":"Horse-Drawn Wagon","body":"Can move 2 zones per turn. Capacity: 2 people in the front and up to 6 in the back. +1 Effect when defending from infantry.","description":"Can move 2 zones per turn. Capacity: 2 people in the front and up to 6 in the back. +1 Effect when defending from infantry.","deck":"medieval","artworkPath":"/assets/medieval/wagon.png","locale":"en"},{"id":"asset-base:medieval_grappling_hook","family":"asset-base","slug":"medieval_grappling_hook","title":"Grappling Hook","body":"+1 Effect while climbing.","description":"+1 Effect while climbing.","deck":"medieval","artworkPath":"/assets/medieval/grappling-hook.png","locale":"en"},{"id":"asset-base:medieval_lockpick_set","family":"asset-base","slug":"medieval_lockpick_set","title":"Lockpick Set","body":"Allows picking locks.","description":"Allows picking locks.","deck":"medieval","artworkPath":"/assets/medieval/lockpick-set.png","locale":"en"},{"id":"asset-base:medieval_bandages","family":"asset-base","slug":"medieval_bandages","title":"Bandages","body":"Removes 2x Injury. Usable during battle. Consumed after use.","description":"Removes 2x Injury. Usable during battle. Consumed after use.","deck":"medieval","artworkPath":"/assets/medieval/bandages.png","locale":"en"},{"id":"asset-base:medieval_healing_salve","family":"asset-base","slug":"medieval_healing_salve","title":"Healing Salve","body":"+1 Effect when healing to remove Injuries. Not usable during battle.","description":"+1 Effect when healing to remove Injuries. Not usable during battle.","deck":"medieval","artworkPath":"/assets/medieval/healing-salve.png","locale":"en"},{"id":"asset-base:medieval_herbal_remedy","family":"asset-base","slug":"medieval_herbal_remedy","title":"Herbal Remedy","body":"Receive a Boost or negate Poison. Usable during battle. Consumed after use.","description":"Receive a Boost or negate Poison. Usable during battle. Consumed after use.","deck":"medieval","artworkPath":"/assets/medieval/herbal-remedy.png","locale":"en"},{"id":"asset-base:medieval_prayer_book","family":"asset-base","slug":"medieval_prayer_book","title":"Prayer Book","body":"+1 Effect when practicing religion to relieve Distress. Not usable during battle.","description":"+1 Effect when practicing religion to relieve Distress. Not usable during battle.","deck":"medieval","artworkPath":"/assets/medieval/prayer-book.png","locale":"en"},{"id":"asset-base:medieval_mead","family":"asset-base","slug":"medieval_mead","title":"Mead","body":"Removes 2x Distress. Usable during battle. Consumed after use.","description":"Removes 2x Distress. Usable during battle. Consumed after use.","deck":"medieval","artworkPath":"/assets/medieval/mead.png","locale":"en"},{"id":"asset-base:medieval_grenade","family":"asset-base","slug":"medieval_grenade","title":"Grenade","body":"Play an Outcome card to throw the granade up to 1 zone away. Damages everything in the zone. Consumed after use.","description":"Play an Outcome card to throw the granade up to 1 zone away. Damages everything in the zone. Consumed after use.","deck":"medieval","artworkPath":"/assets/medieval/grenade.png","locale":"en"},{"id":"asset-base:medieval_lantern","family":"asset-base","slug":"medieval_lantern","title":"Lantern","body":"Provides light in the current zone. Can be used in the rain. Does not count as an open flame.","description":"Provides light in the current zone. Can be used in the rain. Does not count as an open flame.","deck":"medieval","artworkPath":"/assets/medieval/lantern.png","locale":"en"},{"id":"asset-base:medieval_torch","family":"asset-base","slug":"medieval_torch","title":"Torch","body":"Provides light in the current zone. Cannot be used in the rain. Counts as an open flame.","description":"Provides light in the current zone. Cannot be used in the rain. Counts as an open flame.","deck":"medieval","artworkPath":"/assets/medieval/torch.png","locale":"en"},{"id":"asset-base:medieval_cannon","family":"asset-base","slug":"medieval_cannon","title":"Cannon","body":"A heavy explosive artillery weapon. Range: 1+ zones away. Ignores all shields and armor. Damages everything in the zone.","description":"A heavy explosive artillery weapon. Range: 1+ zones away. Ignores all shields and armor. Damages everything in the zone.","deck":"medieval","artworkPath":"/assets/medieval/cannon.png","locale":"en"},{"id":"asset-base:medieval_rations","family":"asset-base","slug":"medieval_rations","title":"Rations","body":"Food and water to sustain a person for a day.","description":"Food and water to sustain a person for a day.","deck":"medieval","artworkPath":"/assets/medieval/rations.png","locale":"en"},{"id":"asset-base:medieval_pouch","family":"asset-base","slug":"medieval_pouch","title":"Pouch","body":"A pouch can store easily accessable small things. Can be attached to a belt.","description":"A pouch can store easily accessable small things. Can be attached to a belt.","deck":"medieval","artworkPath":"/assets/medieval/pouch.png","locale":"en"},{"id":"asset-base:medieval_chest","family":"asset-base","slug":"medieval_chest","title":"Chest","body":"A chest can store heavier things for easier transportation. Can be locked.","description":"A chest can store heavier things for easier transportation. Can be locked.","deck":"medieval","artworkPath":"/assets/medieval/chest.png","locale":"en"},{"id":"asset-base:medieval_letter","family":"asset-base","slug":"medieval_letter","title":"Letter","body":"A letter is a convenient way of passing information.","description":"A letter is a convenient way of passing information.","deck":"medieval","artworkPath":"/assets/medieval/letter.png","locale":"en"},{"id":"asset-base:medieval_poison","family":"asset-base","slug":"medieval_poison","title":"Poison","body":"Causes 1x Injury at the end of every Round until healed. Can be applied to a weapon. Usable during battle. Consumed after use.","description":"Causes 1x Injury at the end of every Round until healed. Can be applied to a weapon. Usable during battle. Consumed after use.","deck":"medieval","artworkPath":"/assets/medieval/poison.png","locale":"en"},{"id":"asset-base:medieval_key","family":"asset-base","slug":"medieval_key","title":"Key","body":"What does it open","description":"What does it open","deck":"medieval","artworkPath":"/assets/medieval/key.png","locale":"en"},{"id":"asset-base:medieval_trap","family":"asset-base","slug":"medieval_trap","title":"Trap","body":"Causes 2x Injury and Stuck when stepped on. Takes a Success to escape from it.","description":"Causes 2x Injury and Stuck when stepped on. Takes a Success to escape from it.","deck":"medieval","artworkPath":"/assets/medieval/trap.png","locale":"en"},{"id":"asset-base:medieval_tools","family":"asset-base","slug":"medieval_tools","title":"Tools","body":"Tools for crafting.","description":"Tools for crafting.","deck":"medieval","artworkPath":"/assets/medieval/tools.png","locale":"en"},{"id":"asset-base:medieval_digging","family":"asset-base","slug":"medieval_digging","title":"Digging tools","body":"Usable for mining or breaking down obstacles.","description":"Usable for mining or breaking down obstacles.","deck":"medieval","artworkPath":"/assets/medieval/digging.png","locale":"en"},{"id":"asset-base:medieval_ore","family":"asset-base","slug":"medieval_ore","title":"Ore","body":"Does it contain precious metals, gems or is it just a fancy stone","description":"Does it contain precious metals, gems or is it just a fancy stone","deck":"medieval","artworkPath":"/assets/medieval/ore.png","locale":"en"},{"id":"asset-base:medieval_stone","family":"asset-base","slug":"medieval_stone","title":"Stone","body":"An excellent building material.","description":"An excellent building material.","deck":"medieval","artworkPath":"/assets/medieval/stone.png","locale":"en"},{"id":"asset-base:medieval_wood","family":"asset-base","slug":"medieval_wood","title":"Wood","body":"Good for building, but quite flamable.","description":"Good for building, but quite flamable.","deck":"medieval","artworkPath":"/assets/medieval/wood.png","locale":"en"},{"id":"asset-base:medieval_iron","family":"asset-base","slug":"medieval_iron","title":"Iron","body":"Can be used to craft something useful by a blacksmith.","description":"Can be used to craft something useful by a blacksmith.","deck":"medieval","artworkPath":"/assets/medieval/iron.png","locale":"en"},{"id":"asset-base:medieval_silver","family":"asset-base","slug":"medieval_silver","title":"Silver","body":"Can be used to craft something pretty by a jewler.","description":"Can be used to craft something pretty by a jewler.","deck":"medieval","artworkPath":"/assets/medieval/silver.png","locale":"en"},{"id":"asset-base:medieval_gold","family":"asset-base","slug":"medieval_gold","title":"Gold","body":"Can be used to craft something precious by a jewler.","description":"Can be used to craft something precious by a jewler.","deck":"medieval","artworkPath":"/assets/medieval/gold.png","locale":"en"},{"id":"asset-base:base_light_weapon","family":"asset-base","slug":"base_light_weapon","title":"Light Weapon","body":"When attacking with Success or better, you may also play a Partial Success to attack again.","description":"When attacking with Success or better, you may also play a Partial Success to attack again.","deck":"base","artworkPath":"/assets/base/light_weapon.png","locale":"en"},{"id":"asset-base:base_heavy_weapon","family":"asset-base","slug":"base_heavy_weapon","title":"Heavy Weapon","body":"+1 Effect when attacking with Success or better.","description":"+1 Effect when attacking with Success or better.","deck":"base","artworkPath":"/assets/base/heavy_weapon.png","locale":"en"},{"id":"asset-base:base_reach_weapon","family":"asset-base","slug":"base_reach_weapon","title":"Reach Weapon","body":"Attacks in same or adjacent zone. On Success, prevent target’s movement next round.","description":"Attacks in same or adjacent zone. On Success, prevent target’s movement next round.","deck":"base","artworkPath":"/assets/base/reach_weapon.png","locale":"en"},{"id":"asset-base:base_spread_weapon","family":"asset-base","slug":"base_spread_weapon","title":"Spread Weapon","body":"Attack all enemies in your zone or an adjacent one.","description":"Attack all enemies in your zone or an adjacent one.","deck":"base","artworkPath":"/assets/base/spread_weapon.png","locale":"en"},{"id":"asset-base:base_throwable_weapon","family":"asset-base","slug":"base_throwable_weapon","title":"Throwable Weapon","body":"Throw to attack up to 2 zones away.","description":"Throw to attack up to 2 zones away.","deck":"base","artworkPath":"/assets/base/throwable_weapon.png","locale":"en"},{"id":"asset-base:base_precision_weapon","family":"asset-base","slug":"base_precision_weapon","title":"Precision Weapon","body":"Shoot to attack up to 3 zones away.","description":"Shoot to attack up to 3 zones away.","deck":"base","artworkPath":"/assets/base/precision_weapon.png","locale":"en"},{"id":"asset-base:base_repeating_weapon","family":"asset-base","slug":"base_repeating_weapon","title":"Repeating Weapon","body":"Attack up to 3 targets 1-2 zones away. Draw from the Outcome Deck for each enemy. Stop on Fumble.","description":"Attack up to 3 targets 1-2 zones away. Draw from the Outcome Deck for each enemy. Stop on Fumble.","deck":"base","artworkPath":"/assets/base/repeating_weapon.png","locale":"en"},{"id":"asset-base:base_artillery_weapon","family":"asset-base","slug":"base_artillery_weapon","title":"Artillery Weapon","body":"Play an Outcome card. At the beginning of your next turn, attack all enemies in the targeted zone with the result.","description":"Play an Outcome card. At the beginning of your next turn, attack all enemies in the targeted zone with the result.","deck":"base","artworkPath":"/assets/base/artillery_weapon.png","locale":"en"},{"id":"asset-base:base_light_armor","family":"asset-base","slug":"base_light_armor","title":"Light Armor","body":"Reduce received Injury by 1 and convert it to a Distress.","description":"Reduce received Injury by 1 and convert it to a Distress.","deck":"base","artworkPath":"/assets/base/light_armor.png","locale":"en"},{"id":"asset-base:base_heavy_armor","family":"asset-base","slug":"base_heavy_armor","title":"Heavy Armor","body":"Reduce received Injury by 1.","description":"Reduce received Injury by 1.","deck":"base","artworkPath":"/assets/base/heavy_armor.png","locale":"en"},{"id":"asset-base:base_shield","family":"asset-base","slug":"base_shield","title":"Shield","body":"Convert a Partial Success into a Success when defending.","description":"Convert a Partial Success into a Success when defending.","deck":"base","artworkPath":"/assets/base/shield.png","locale":"en"},{"id":"asset-base:base_healing","family":"asset-base","slug":"base_healing","title":"Healing","body":"Consumable.\\nRemove 1 Injury or spend an action and remove Effect +1 Injury.","description":"Consumable.\\nRemove 1 Injury or spend an action and remove Effect +1 Injury.","deck":"base","artworkPath":"/assets/base/healing.png","locale":"en"},{"id":"asset-base:base_comfort","family":"asset-base","slug":"base_comfort","title":"Comfort","body":"Consumable.\\nRemove 1 Distress or spend an action and remove Effect +1 Distress.","description":"Consumable.\\nRemove 1 Distress or spend an action and remove Effect +1 Distress.","deck":"base","artworkPath":"/assets/base/comfort.png","locale":"en"},{"id":"asset-base:base_surge","family":"asset-base","slug":"base_surge","title":"Surge","body":"Consumable.\\nReceive 2x Boost.","description":"Consumable.\\nReceive 2x Boost.","deck":"base","artworkPath":"/assets/base/surge.png","locale":"en"},{"id":"asset-base:base_tools","family":"asset-base","slug":"base_tools","title":"Tools","body":"+1 Effect on an action while using a tool to work.","description":"+1 Effect on an action while using a tool to work.","deck":"base","artworkPath":"/assets/base/tools.png","locale":"en"},{"id":"asset-base:base_light","family":"asset-base","slug":"base_light","title":"Light","body":"Lights up current zone.","description":"Lights up current zone.","deck":"base","artworkPath":"/assets/base/light.png","locale":"en"},{"id":"asset-base:base_vehicle","family":"asset-base","slug":"base_vehicle","title":"Vehicle","body":"On Move, you can move +1 zone further.","description":"On Move, you can move +1 zone further.","deck":"base","artworkPath":"/assets/base/vehicle.png","locale":"en"},{"id":"asset-base:base_package","family":"asset-base","slug":"base_package","title":"Package","body":"Contains something important.","description":"Contains something important.","deck":"base","artworkPath":"/assets/base/package.png","locale":"en"},{"id":"asset-base:base_document","family":"asset-base","slug":"base_document","title":"Document","body":"Holds important information.","description":"Holds important information.","deck":"base","artworkPath":"/assets/base/document.png","locale":"en"},{"id":"asset-base:base_valuables","family":"asset-base","slug":"base_valuables","title":"Valuables","body":"Holds valuable items or currency.","description":"Holds valuable items or currency.","deck":"base","artworkPath":"/assets/base/valuables.png","locale":"en"},{"id":"asset-base:base_key","family":"asset-base","slug":"base_key","title":"Key","body":"Opens something important.","description":"Opens something important.","deck":"base","artworkPath":"/assets/base/key.png","locale":"en"},{"id":"asset-base:base_resources","family":"asset-base","slug":"base_resources","title":"Resources","body":"Basic resources for crafting or building.","description":"Basic resources for crafting or building.","deck":"base","artworkPath":"/assets/base/resources.png","locale":"en"},{"id":"asset-modifier:base_fast","family":"asset-modifier","slug":"base_fast","title":"Fast","body":"May be used twice in a round at -1 Effect each.","description":"May be used twice in a round at -1 Effect each.","deck":"base mod","artworkPath":"/assets/base/fast.png","locale":"en"},{"id":"asset-modifier:base_empowered","family":"asset-modifier","slug":"base_empowered","title":"Empowered","body":"+1 Effect on Success or better.","description":"+1 Effect on Success or better.","deck":"base mod","artworkPath":"/assets/base/empowered.png","locale":"en"},{"id":"asset-modifier:base_wide","family":"asset-modifier","slug":"base_wide","title":"Wide","body":"Affects an additional target in the same zone.","description":"Affects an additional target in the same zone.","deck":"base mod","artworkPath":"/assets/base/wide.png","locale":"en"},{"id":"asset-modifier:base_burning","family":"asset-modifier","slug":"base_burning","title":"Burning","body":"Inflicts 1 Burning per attack or defend action.","description":"Inflicts 1 Burning per attack or defend action.","deck":"base mod","artworkPath":"/assets/base/burning.png","locale":"en"},{"id":"asset-modifier:base_freezing","family":"asset-modifier","slug":"base_freezing","title":"Freezing","body":"Inflicts 1 Freezing per attack or defend action.","description":"Inflicts 1 Freezing per attack or defend action.","deck":"base mod","artworkPath":"/assets/base/freezing.png","locale":"en"},{"id":"asset-modifier:base_insulating","family":"asset-modifier","slug":"base_insulating","title":"Insulating","body":"Protects from 1 Freezing or 1 Burning per defend action.","description":"Protects from 1 Freezing or 1 Burning per defend action.","deck":"base mod","artworkPath":"/assets/base/insulating.png","locale":"en"},{"id":"asset-modifier:base_irritating","family":"asset-modifier","slug":"base_irritating","title":"Irritating","body":"Inflicts 1 Distress per attack or defend action.","description":"Inflicts 1 Distress per attack or defend action.","deck":"base mod","artworkPath":"/assets/base/irritating.png","locale":"en"},{"id":"asset-modifier:base_penetrating","family":"asset-modifier","slug":"base_penetrating","title":"Penetrating","body":"Ignores 1 Injury reduction / atk. or inflicts 1 Injury / def. action.","description":"Ignores 1 Injury reduction / atk. or inflicts 1 Injury / def. action.","deck":"base mod","artworkPath":"/assets/base/penetrating.png","locale":"en"},{"id":"asset-modifier:base_fragile","family":"asset-modifier","slug":"base_fragile","title":"Fragile","body":"Makes an item consumable. Discard after first use.","description":"Makes an item consumable. Discard after first use.","deck":"base mod","artworkPath":"/assets/base/fragile.png","locale":"en"},{"id":"asset-modifier:base_permanent","family":"asset-modifier","slug":"base_permanent","title":"Permanent","body":"Makes a consumable permanent.","description":"Makes a consumable permanent.","deck":"base mod","artworkPath":"/assets/base/permanent.png","locale":"en"},{"id":"asset-modifier:base_hidden","family":"asset-modifier","slug":"base_hidden","title":"Hidden","body":"Not revealed until first use.","description":"Not revealed until first use.","deck":"base mod","artworkPath":"/assets/base/hidden.png","locale":"en"},{"id":"asset-modifier:base_annoying","family":"asset-modifier","slug":"base_annoying","title":"Annoying","body":"On action, suffer 1 Distress.","description":"On action, suffer 1 Distress.","deck":"base mod","artworkPath":"/assets/base/annoying.png","locale":"en"},{"id":"asset-modifier:base_dangerous","family":"asset-modifier","slug":"base_dangerous","title":"Dangerous","body":"On action, +1 Effect and suffer 1 Injury.","description":"On action, +1 Effect and suffer 1 Injury.","deck":"base mod","artworkPath":"/assets/base/dangerous.png","locale":"en"},{"id":"asset-modifier:base_pushing","family":"asset-modifier","slug":"base_pushing","title":"Pushing","body":"On action, move target to an adjacent zone.","description":"On action, move target to an adjacent zone.","deck":"base mod","artworkPath":"/assets/base/pushing.png","locale":"en"},{"id":"asset-modifier:base_pulling","family":"asset-modifier","slug":"base_pulling","title":"Pulling","body":"On action, move target to your zone.","description":"On action, move target to your zone.","deck":"base mod","artworkPath":"/assets/base/pulling.png","locale":"en"},{"id":"asset-modifier:base_area","family":"asset-modifier","slug":"base_area","title":"Area","body":"Affects all targets in the zone.","description":"Affects all targets in the zone.","deck":"base mod","artworkPath":"/assets/base/area.png","locale":"en"},{"id":"counter:agreement","family":"counter","slug":"agreement","title":"Agreement","artworkPath":"/counters/agreement.png","locale":"en"},{"id":"counter:construction","family":"counter","slug":"construction","title":"Construction","artworkPath":"/counters/construction.png","locale":"en"},{"id":"counter:crafting","family":"counter","slug":"crafting","title":"Crafting","artworkPath":"/counters/crafting.png","locale":"en"},{"id":"counter:danger","family":"counter","slug":"danger","title":"Danger","artworkPath":"/counters/danger.png","locale":"en"},{"id":"counter:defense","family":"counter","slug":"defense","title":"Defense","artworkPath":"/counters/defense.png","locale":"en"},{"id":"counter:destruction","family":"counter","slug":"destruction","title":"Destruction","artworkPath":"/counters/destruction.png","locale":"en"},{"id":"counter:distance","family":"counter","slug":"distance","title":"Distance","artworkPath":"/counters/distance.png","locale":"en"},{"id":"counter:drop","family":"counter","slug":"drop","title":"Drop","artworkPath":"/counters/drop.png","locale":"en"},{"id":"counter:energy","family":"counter","slug":"energy","title":"Energy","artworkPath":"/counters/energy.png","locale":"en"},{"id":"counter:escape","family":"counter","slug":"escape","title":"Escape","artworkPath":"/counters/escape.png","locale":"en"},{"id":"counter:euphoria","family":"counter","slug":"euphoria","title":"Euphoria","artworkPath":"/counters/euphoria.png","locale":"en"},{"id":"counter:incognito","family":"counter","slug":"incognito","title":"Incognito","artworkPath":"/counters/incognito.png","locale":"en"},{"id":"counter:investigation","family":"counter","slug":"investigation","title":"Investigation","artworkPath":"/counters/investigation.png","locale":"en"},{"id":"counter:morale","family":"counter","slug":"morale","title":"Morale","artworkPath":"/counters/morale.png","locale":"en"},{"id":"counter:performance","family":"counter","slug":"performance","title":"Performance","artworkPath":"/counters/performance.png","locale":"en"},{"id":"counter:persuasion","family":"counter","slug":"persuasion","title":"Persuasion","artworkPath":"/counters/persuasion.png","locale":"en"},{"id":"counter:race","family":"counter","slug":"race","title":"Race","artworkPath":"/counters/race.png","locale":"en"},{"id":"counter:reputation","family":"counter","slug":"reputation","title":"Reputation","artworkPath":"/counters/reputation.png","locale":"en"},{"id":"counter:resources","family":"counter","slug":"resources","title":"Resources","artworkPath":"/counters/resources.png","locale":"en"},{"id":"counter:stealth","family":"counter","slug":"stealth","title":"Stealth","artworkPath":"/counters/stealth.png","locale":"en"},{"id":"counter:study","family":"counter","slug":"study","title":"Study","artworkPath":"/counters/study.png","locale":"en"},{"id":"counter:time","family":"counter","slug":"time","title":"Time","artworkPath":"/counters/time.png","locale":"en"},{"id":"counter:tracking","family":"counter","slug":"tracking","title":"Tracking","artworkPath":"/counters/tracking.png","locale":"en"},{"id":"counter:wealth","family":"counter","slug":"wealth","title":"Wealth","artworkPath":"/counters/wealth.png","locale":"en"}]`), Se = /* @__PURE__ */ JSON.parse('[{"id":"actor-base:medieval_villager","family":"actor-base","slug":"medieval_villager","title":"Villager","deck":"medieval","artworkPath":"/actors/medieval/villager.png","locale":"en"},{"id":"actor-base:medieval_alchemist","family":"actor-base","slug":"medieval_alchemist","title":"Alchemist","deck":"medieval","artworkPath":"/actors/medieval/alchemist.png","locale":"en"},{"id":"actor-base:medieval_aristocrat","family":"actor-base","slug":"medieval_aristocrat","title":"Aristocrat","deck":"medieval","artworkPath":"/actors/medieval/aristocrat.png","locale":"en"},{"id":"actor-base:medieval_bandit","family":"actor-base","slug":"medieval_bandit","title":"Bandit","deck":"medieval","artworkPath":"/actors/medieval/bandit.png","locale":"en"},{"id":"actor-base:medieval_beggar","family":"actor-base","slug":"medieval_beggar","title":"Beggar","deck":"medieval","artworkPath":"/actors/medieval/beggar.png","locale":"en"},{"id":"actor-base:medieval_child","family":"actor-base","slug":"medieval_child","title":"Child","deck":"medieval","artworkPath":"/actors/medieval/child.png","locale":"en"},{"id":"actor-base:medieval_craftsman","family":"actor-base","slug":"medieval_craftsman","title":"Craftsman","deck":"medieval","artworkPath":"/actors/medieval/craftsman.png","locale":"en"},{"id":"actor-base:medieval_elder","family":"actor-base","slug":"medieval_elder","title":"Elder","deck":"medieval","artworkPath":"/actors/medieval/elder.png","locale":"en"},{"id":"actor-base:medieval_farmer","family":"actor-base","slug":"medieval_farmer","title":"Farmer","deck":"medieval","artworkPath":"/actors/medieval/farmer.png","locale":"en"},{"id":"actor-base:medieval_hunter","family":"actor-base","slug":"medieval_hunter","title":"Hunter","deck":"medieval","artworkPath":"/actors/medieval/hunter.png","locale":"en"},{"id":"actor-base:medieval_idiot","family":"actor-base","slug":"medieval_idiot","title":"Idiot","deck":"medieval","artworkPath":"/actors/medieval/idiot.png","locale":"en"},{"id":"actor-base:medieval_knight","family":"actor-base","slug":"medieval_knight","title":"Knight","deck":"medieval","artworkPath":"/actors/medieval/knight.png","locale":"en"},{"id":"actor-base:medieval_marksman","family":"actor-base","slug":"medieval_marksman","title":"Marksman","deck":"medieval","artworkPath":"/actors/medieval/marksman.png","locale":"en"},{"id":"actor-base:medieval_merchant","family":"actor-base","slug":"medieval_merchant","title":"Merchant","deck":"medieval","artworkPath":"/actors/medieval/merchant.png","locale":"en"},{"id":"actor-base:medieval_militia","family":"actor-base","slug":"medieval_militia","title":"Militia","deck":"medieval","artworkPath":"/actors/medieval/militia.png","locale":"en"},{"id":"actor-base:medieval_pikeman","family":"actor-base","slug":"medieval_pikeman","title":"Pikeman","deck":"medieval","artworkPath":"/actors/medieval/pikeman.png","locale":"en"},{"id":"actor-base:medieval_priest","family":"actor-base","slug":"medieval_priest","title":"Priest","deck":"medieval","artworkPath":"/actors/medieval/priest.png","locale":"en"},{"id":"actor-base:medieval_rogue","family":"actor-base","slug":"medieval_rogue","title":"Rogue","deck":"medieval","artworkPath":"/actors/medieval/rogue.png","locale":"en"},{"id":"actor-base:medieval_scholar","family":"actor-base","slug":"medieval_scholar","title":"Scholar","deck":"medieval","artworkPath":"/actors/medieval/scholar.png","locale":"en"},{"id":"actor-base:medieval_shopkeeper","family":"actor-base","slug":"medieval_shopkeeper","title":"Shopkeeper","deck":"medieval","artworkPath":"/actors/medieval/shopkeeper.png","locale":"en"},{"id":"actor-base:medieval_female_villager","family":"actor-base","slug":"medieval_female_villager","title":"Villager","deck":"medieval","artworkPath":"/actors/medieval/female/villager.png","locale":"en"},{"id":"actor-base:medieval_female_alchemist","family":"actor-base","slug":"medieval_female_alchemist","title":"Alchemist","deck":"medieval","artworkPath":"/actors/medieval/female/alchemist.png","locale":"en"},{"id":"actor-base:medieval_female_aristocrat","family":"actor-base","slug":"medieval_female_aristocrat","title":"Aristocrat","deck":"medieval","artworkPath":"/actors/medieval/female/aristocrat.png","locale":"en"},{"id":"actor-base:medieval_female_bandit","family":"actor-base","slug":"medieval_female_bandit","title":"Bandit","deck":"medieval","artworkPath":"/actors/medieval/female/bandit.png","locale":"en"},{"id":"actor-base:medieval_female_beggar","family":"actor-base","slug":"medieval_female_beggar","title":"Beggar","deck":"medieval","artworkPath":"/actors/medieval/female/beggar.png","locale":"en"},{"id":"actor-base:medieval_female_child","family":"actor-base","slug":"medieval_female_child","title":"Child","deck":"medieval","artworkPath":"/actors/medieval/female/child.png","locale":"en"},{"id":"actor-base:medieval_female_craftsman","family":"actor-base","slug":"medieval_female_craftsman","title":"Craftsman","deck":"medieval","artworkPath":"/actors/medieval/female/craftsman.png","locale":"en"},{"id":"actor-base:medieval_female_elder","family":"actor-base","slug":"medieval_female_elder","title":"Elder","deck":"medieval","artworkPath":"/actors/medieval/female/elder.png","locale":"en"},{"id":"actor-base:medieval_female_farmer","family":"actor-base","slug":"medieval_female_farmer","title":"Farmer","deck":"medieval","artworkPath":"/actors/medieval/female/farmer.png","locale":"en"},{"id":"actor-base:medieval_female_hunter","family":"actor-base","slug":"medieval_female_hunter","title":"Hunter","deck":"medieval","artworkPath":"/actors/medieval/female/hunter.png","locale":"en"},{"id":"actor-base:medieval_female_crazy-cat-lady","family":"actor-base","slug":"medieval_female_crazy-cat-lady","title":"Crazy Cat Lady","deck":"medieval","artworkPath":"/actors/medieval/female/crazy-cat-lady.png","locale":"en"},{"id":"actor-base:medieval_female_knight","family":"actor-base","slug":"medieval_female_knight","title":"Knight","deck":"medieval","artworkPath":"/actors/medieval/female/knight.png","locale":"en"},{"id":"actor-base:medieval_female_marksman","family":"actor-base","slug":"medieval_female_marksman","title":"Marksman","deck":"medieval","artworkPath":"/actors/medieval/female/marksman.png","locale":"en"},{"id":"actor-base:medieval_female_merchant","family":"actor-base","slug":"medieval_female_merchant","title":"Merchant","deck":"medieval","artworkPath":"/actors/medieval/female/merchant.png","locale":"en"},{"id":"actor-base:medieval_female_militia","family":"actor-base","slug":"medieval_female_militia","title":"Militia","deck":"medieval","artworkPath":"/actors/medieval/female/militia.png","locale":"en"},{"id":"actor-base:medieval_female_pikeman","family":"actor-base","slug":"medieval_female_pikeman","title":"Pikeman","deck":"medieval","artworkPath":"/actors/medieval/female/pikeman.png","locale":"en"},{"id":"actor-base:medieval_female_nun","family":"actor-base","slug":"medieval_female_nun","title":"Nun","deck":"medieval","artworkPath":"/actors/medieval/female/nun.png","locale":"en"},{"id":"actor-base:medieval_female_rogue","family":"actor-base","slug":"medieval_female_rogue","title":"Rogue","deck":"medieval","artworkPath":"/actors/medieval/female/rogue.png","locale":"en"},{"id":"actor-base:medieval_female_scribe","family":"actor-base","slug":"medieval_female_scribe","title":"Scribe","deck":"medieval","artworkPath":"/actors/medieval/female/scribe.png","locale":"en"},{"id":"actor-base:medieval_female_shopkeeper","family":"actor-base","slug":"medieval_female_shopkeeper","title":"Shopkeeper","deck":"medieval","artworkPath":"/actors/medieval/female/shopkeeper.png","locale":"en"},{"id":"location:medieval_dungeon","family":"location","slug":"medieval_dungeon","title":"Dungeon","deck":"medieval","artworkPath":"/locations/medieval/dungeon.jpg","locale":"en"},{"id":"location:medieval_forrest","family":"location","slug":"medieval_forrest","title":"Forrest","deck":"medieval","artworkPath":"/locations/medieval/forrest.jpg","locale":"en"},{"id":"location:medieval_garden","family":"location","slug":"medieval_garden","title":"Garden","deck":"medieval","artworkPath":"/locations/medieval/garden.jpg","locale":"en"},{"id":"location:medieval_graveyard","family":"location","slug":"medieval_graveyard","title":"Graveyard","deck":"medieval","artworkPath":"/locations/medieval/graveyard.jpg","locale":"en"},{"id":"location:medieval_harbor","family":"location","slug":"medieval_harbor","title":"Harbor","deck":"medieval","artworkPath":"/locations/medieval/harbor.jpg","locale":"en"},{"id":"location:medieval_lake","family":"location","slug":"medieval_lake","title":"Lake","deck":"medieval","artworkPath":"/locations/medieval/lake.jpg","locale":"en"},{"id":"location:medieval_market","family":"location","slug":"medieval_market","title":"Market","deck":"medieval","artworkPath":"/locations/medieval/market.jpg","locale":"en"},{"id":"location:medieval_mine_shaft","family":"location","slug":"medieval_mine_shaft","title":"Mine Shaft","deck":"medieval","artworkPath":"/locations/medieval/mine_shaft.jpg","locale":"en"},{"id":"location:medieval_pantry","family":"location","slug":"medieval_pantry","title":"Pantry","deck":"medieval","artworkPath":"/locations/medieval/pantry.jpg","locale":"en"},{"id":"location:medieval_pasture","family":"location","slug":"medieval_pasture","title":"Pasture","deck":"medieval","artworkPath":"/locations/medieval/pasture.jpg","locale":"en"},{"id":"location:medieval_quarry","family":"location","slug":"medieval_quarry","title":"Quarry","deck":"medieval","artworkPath":"/locations/medieval/quarry.jpg","locale":"en"},{"id":"location:medieval_road","family":"location","slug":"medieval_road","title":"Road","deck":"medieval","artworkPath":"/locations/medieval/road.jpg","locale":"en"},{"id":"location:medieval_servants_quarters","family":"location","slug":"medieval_servants_quarters","title":"Servants Room","deck":"medieval","artworkPath":"/locations/medieval/servants_quarters.jpg","locale":"en"},{"id":"location:medieval_sewer","family":"location","slug":"medieval_sewer","title":"Sewer","deck":"medieval","artworkPath":"/locations/medieval/sewer.jpg","locale":"en"},{"id":"location:medieval_swamp","family":"location","slug":"medieval_swamp","title":"Swamp","deck":"medieval","artworkPath":"/locations/medieval/swamp.jpg","locale":"en"},{"id":"location:medieval_tavern","family":"location","slug":"medieval_tavern","title":"Tavern","deck":"medieval","artworkPath":"/locations/medieval/tavern.jpg","locale":"en"},{"id":"location:medieval_town_square","family":"location","slug":"medieval_town_square","title":"Town Square","deck":"medieval","artworkPath":"/locations/medieval/town_square.jpg","locale":"en"},{"id":"location:medieval_townhouse_bath_room","family":"location","slug":"medieval_townhouse_bath_room","title":"Townhouse Bath Room","deck":"medieval","artworkPath":"/locations/medieval/townhouse_bath_room.jpg","locale":"en"},{"id":"location:medieval_townhouse_bedchamber","family":"location","slug":"medieval_townhouse_bedchamber","title":"Townhouse Bedchamber","deck":"medieval","artworkPath":"/locations/medieval/townhouse_bedchamber.jpg","locale":"en"},{"id":"location:medieval_townhouse_corridor","family":"location","slug":"medieval_townhouse_corridor","title":"Townhouse Corridor","deck":"medieval","artworkPath":"/locations/medieval/townhouse_corridor.jpg","locale":"en"},{"id":"location:medieval_townhouse_dining_room","family":"location","slug":"medieval_townhouse_dining_room","title":"Townhouse Dining Room","deck":"medieval","artworkPath":"/locations/medieval/townhouse_dining_room.jpg","locale":"en"},{"id":"location:medieval_townhouse_nursery","family":"location","slug":"medieval_townhouse_nursery","title":"Townhouse Nursery","deck":"medieval","artworkPath":"/locations/medieval/townhouse_nursery.jpg","locale":"en"},{"id":"location:medieval_townhouse_study","family":"location","slug":"medieval_townhouse_study","title":"Townhouse Study","deck":"medieval","artworkPath":"/locations/medieval/townhouse_study.jpg","locale":"en"},{"id":"location:medieval_village","family":"location","slug":"medieval_village","title":"Village","deck":"medieval","artworkPath":"/locations/medieval/village.jpg","locale":"en"},{"id":"location:medieval_vine_cellar","family":"location","slug":"medieval_vine_cellar","title":"Vine Cellar","deck":"medieval","artworkPath":"/locations/medieval/vine_cellar.jpg","locale":"en"},{"id":"location:medieval_warehouse","family":"location","slug":"medieval_warehouse","title":"Warehouse","deck":"medieval","artworkPath":"/locations/medieval/warehouse.jpg","locale":"en"},{"id":"location:medieval_weapons_shop","family":"location","slug":"medieval_weapons_shop","title":"Weapons Shop","deck":"medieval","artworkPath":"/locations/medieval/weapons_shop.jpg","locale":"en"},{"id":"location:medieval_workshop","family":"location","slug":"medieval_workshop","title":"Workshop","deck":"medieval","artworkPath":"/locations/medieval/workshop.jpg","locale":"en"},{"id":"location:medieval_armory","family":"location","slug":"medieval_armory","title":"Armory","deck":"medieval","artworkPath":"/locations/medieval/armory.jpg","locale":"en"},{"id":"location:medieval_bakery","family":"location","slug":"medieval_bakery","title":"Bakery","deck":"medieval","artworkPath":"/locations/medieval/bakery.jpg","locale":"en"},{"id":"location:medieval_barracks","family":"location","slug":"medieval_barracks","title":"Barracks","deck":"medieval","artworkPath":"/locations/medieval/barracks.jpg","locale":"en"},{"id":"location:medieval_bathhouse","family":"location","slug":"medieval_bathhouse","title":"Bathhouse","deck":"medieval","artworkPath":"/locations/medieval/bathhouse.jpg","locale":"en"},{"id":"location:medieval_butchery","family":"location","slug":"medieval_butchery","title":"Butchery","deck":"medieval","artworkPath":"/locations/medieval/butchery.jpg","locale":"en"},{"id":"location:medieval_camp","family":"location","slug":"medieval_camp","title":"Camp","deck":"medieval","artworkPath":"/locations/medieval/camp.jpg","locale":"en"},{"id":"location:medieval_castle_bastion","family":"location","slug":"medieval_castle_bastion","title":"Castle Bastion","deck":"medieval","artworkPath":"/locations/medieval/castle_bastion.jpg","locale":"en"},{"id":"location:medieval_castle_bailey","family":"location","slug":"medieval_castle_bailey","title":"Castle Bailey","deck":"medieval","artworkPath":"/locations/medieval/castle_bailey.jpg","locale":"en"},{"id":"location:medieval_castle_corridor","family":"location","slug":"medieval_castle_corridor","title":"Castle Corridor","deck":"medieval","artworkPath":"/locations/medieval/castle_corridor.jpg","locale":"en"},{"id":"location:medieval_castle_dining_room","family":"location","slug":"medieval_castle_dining_room","title":"Castle Dining Room","deck":"medieval","artworkPath":"/locations/medieval/castle_dining_room.jpg","locale":"en"},{"id":"location:medieval_castle_gate","family":"location","slug":"medieval_castle_gate","title":"Castle Gate","deck":"medieval","artworkPath":"/locations/medieval/castle_gate.jpg","locale":"en"},{"id":"location:medieval_cave","family":"location","slug":"medieval_cave","title":"Cave","deck":"medieval","artworkPath":"/locations/medieval/cave.jpg","locale":"en"},{"id":"location:medieval_church","family":"location","slug":"medieval_church","title":"Church","deck":"medieval","artworkPath":"/locations/medieval/church.jpg","locale":"en"},{"id":"location:medieval_clearing","family":"location","slug":"medieval_clearing","title":"Clearing","deck":"medieval","artworkPath":"/locations/medieval/clearing.jpg","locale":"en"},{"id":"location:medieval_mountain_trail","family":"location","slug":"medieval_mountain_trail","title":"Mountain Trail","deck":"medieval","artworkPath":"/locations/medieval/mountain_trail.jpg","locale":"en"},{"id":"location:medieval_prison_cell","family":"location","slug":"medieval_prison_cell","title":"Prison Cell","deck":"medieval","artworkPath":"/locations/medieval/prison_cell.jpg","locale":"en"},{"id":"location:medieval_dark_alley","family":"location","slug":"medieval_dark_alley","title":"Dark Alley","deck":"medieval","artworkPath":"/locations/medieval/dark_alley.jpg","locale":"en"},{"id":"location:medieval_library","family":"location","slug":"medieval_library","title":"Library","deck":"medieval","artworkPath":"/locations/medieval/library.jpg","locale":"en"},{"id":"location:medieval_apothecary","family":"location","slug":"medieval_apothecary","title":"Apothecary","deck":"medieval","artworkPath":"/locations/medieval/apothecary.jpg","locale":"en"},{"id":"location:medieval_winery","family":"location","slug":"medieval_winery","title":"Winery","deck":"medieval","artworkPath":"/locations/medieval/winery.jpg","locale":"en"}]'), G = {
  contentVersion: xe,
  cards: Ce,
  medievalCards: Se
};
var b;
(function(t) {
  t.assertEqual = (i) => {
  };
  function e(i) {
  }
  t.assertIs = e;
  function a(i) {
    throw new Error();
  }
  t.assertNever = a, t.arrayToEnum = (i) => {
    const n = {};
    for (const r of i)
      n[r] = r;
    return n;
  }, t.getValidEnumValues = (i) => {
    const n = t.objectKeys(i).filter((o) => typeof i[i[o]] != "number"), r = {};
    for (const o of n)
      r[o] = i[o];
    return t.objectValues(r);
  }, t.objectValues = (i) => t.objectKeys(i).map(function(n) {
    return i[n];
  }), t.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const n = [];
    for (const r in i)
      Object.prototype.hasOwnProperty.call(i, r) && n.push(r);
    return n;
  }, t.find = (i, n) => {
    for (const r of i)
      if (n(r))
        return r;
  }, t.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && Number.isFinite(i) && Math.floor(i) === i;
  function s(i, n = " | ") {
    return i.map((r) => typeof r == "string" ? `'${r}'` : r).join(n);
  }
  t.joinValues = s, t.jsonStringifyReplacer = (i, n) => typeof n == "bigint" ? n.toString() : n;
})(b || (b = {}));
var ae;
(function(t) {
  t.mergeShapes = (e, a) => ({
    ...e,
    ...a
    // second overwrites first
  });
})(ae || (ae = {}));
const d = b.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), C = (t) => {
  switch (typeof t) {
    case "undefined":
      return d.undefined;
    case "string":
      return d.string;
    case "number":
      return Number.isNaN(t) ? d.nan : d.number;
    case "boolean":
      return d.boolean;
    case "function":
      return d.function;
    case "bigint":
      return d.bigint;
    case "symbol":
      return d.symbol;
    case "object":
      return Array.isArray(t) ? d.array : t === null ? d.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? d.promise : typeof Map < "u" && t instanceof Map ? d.map : typeof Set < "u" && t instanceof Set ? d.set : typeof Date < "u" && t instanceof Date ? d.date : d.object;
    default:
      return d.unknown;
  }
}, l = b.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class x extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const a = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, a) : this.__proto__ = a, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const a = e || function(n) {
      return n.message;
    }, s = { _errors: [] }, i = (n) => {
      for (const r of n.issues)
        if (r.code === "invalid_union")
          r.unionErrors.map(i);
        else if (r.code === "invalid_return_type")
          i(r.returnTypeError);
        else if (r.code === "invalid_arguments")
          i(r.argumentsError);
        else if (r.path.length === 0)
          s._errors.push(a(r));
        else {
          let o = s, m = 0;
          for (; m < r.path.length; ) {
            const h = r.path[m];
            m === r.path.length - 1 ? (o[h] = o[h] || { _errors: [] }, o[h]._errors.push(a(r))) : o[h] = o[h] || { _errors: [] }, o = o[h], m++;
          }
        }
    };
    return i(this), s;
  }
  static assert(e) {
    if (!(e instanceof x))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, b.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (a) => a.message) {
    const a = {}, s = [];
    for (const i of this.issues)
      if (i.path.length > 0) {
        const n = i.path[0];
        a[n] = a[n] || [], a[n].push(e(i));
      } else
        s.push(e(i));
    return { formErrors: s, fieldErrors: a };
  }
  get formErrors() {
    return this.flatten();
  }
}
x.create = (t) => new x(t);
const q = (t, e) => {
  let a;
  switch (t.code) {
    case l.invalid_type:
      t.received === d.undefined ? a = "Required" : a = `Expected ${t.expected}, received ${t.received}`;
      break;
    case l.invalid_literal:
      a = `Invalid literal value, expected ${JSON.stringify(t.expected, b.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      a = `Unrecognized key(s) in object: ${b.joinValues(t.keys, ", ")}`;
      break;
    case l.invalid_union:
      a = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      a = `Invalid discriminator value. Expected ${b.joinValues(t.options)}`;
      break;
    case l.invalid_enum_value:
      a = `Invalid enum value. Expected ${b.joinValues(t.options)}, received '${t.received}'`;
      break;
    case l.invalid_arguments:
      a = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      a = "Invalid function return type";
      break;
    case l.invalid_date:
      a = "Invalid date";
      break;
    case l.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (a = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (a = `${a} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? a = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? a = `Invalid input: must end with "${t.validation.endsWith}"` : b.assertNever(t.validation) : t.validation !== "regex" ? a = `Invalid ${t.validation}` : a = "Invalid";
      break;
    case l.too_small:
      t.type === "array" ? a = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? a = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? a = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? a = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? a = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : a = "Invalid input";
      break;
    case l.too_big:
      t.type === "array" ? a = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? a = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? a = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? a = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? a = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : a = "Invalid input";
      break;
    case l.custom:
      a = "Invalid input";
      break;
    case l.invalid_intersection_types:
      a = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      a = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case l.not_finite:
      a = "Number must be finite";
      break;
    default:
      a = e.defaultError, b.assertNever(t);
  }
  return { message: a };
};
let je = q;
function Ae() {
  return je;
}
const Ie = (t) => {
  const { data: e, path: a, errorMaps: s, issueData: i } = t, n = [...a, ...i.path || []], r = {
    ...i,
    path: n
  };
  if (i.message !== void 0)
    return {
      ...i,
      path: n,
      message: i.message
    };
  let o = "";
  const m = s.filter((h) => !!h).slice().reverse();
  for (const h of m)
    o = h(r, { data: e, defaultError: o }).message;
  return {
    ...i,
    path: n,
    message: o
  };
};
function c(t, e) {
  const a = Ae(), s = Ie({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      a,
      // then global override map
      a === q ? void 0 : q
      // then global default map
    ].filter((i) => !!i)
  });
  t.common.issues.push(s);
}
class _ {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, a) {
    const s = [];
    for (const i of a) {
      if (i.status === "aborted")
        return g;
      i.status === "dirty" && e.dirty(), s.push(i.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, a) {
    const s = [];
    for (const i of a) {
      const n = await i.key, r = await i.value;
      s.push({
        key: n,
        value: r
      });
    }
    return _.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, a) {
    const s = {};
    for (const i of a) {
      const { key: n, value: r } = i;
      if (n.status === "aborted" || r.status === "aborted")
        return g;
      n.status === "dirty" && e.dirty(), r.status === "dirty" && e.dirty(), n.value !== "__proto__" && (typeof r.value < "u" || i.alwaysSet) && (s[n.value] = r.value);
    }
    return { status: e.value, value: s };
  }
}
const g = Object.freeze({
  status: "aborted"
}), Z = (t) => ({ status: "dirty", value: t }), w = (t) => ({ status: "valid", value: t }), te = (t) => t.status === "aborted", se = (t) => t.status === "dirty", z = (t) => t.status === "valid", $ = (t) => typeof Promise < "u" && t instanceof Promise;
var u;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(u || (u = {}));
class A {
  constructor(e, a, s, i) {
    this._cachedPath = [], this.parent = e, this.data = a, this._path = s, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const ie = (t, e) => {
  if (z(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const a = new x(t.common.issues);
      return this._error = a, this._error;
    }
  };
};
function p(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: a, required_error: s, description: i } = t;
  if (e && (a || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: i } : { errorMap: (r, o) => {
    const { message: m } = t;
    return r.code === "invalid_enum_value" ? { message: m ?? o.defaultError } : typeof o.data > "u" ? { message: m ?? s ?? o.defaultError } : r.code !== "invalid_type" ? { message: o.defaultError } : { message: m ?? a ?? o.defaultError };
  }, description: i };
}
class y {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return C(e.data);
  }
  _getOrReturnCtx(e, a) {
    return a || {
      common: e.parent.common,
      data: e.data,
      parsedType: C(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new _(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: C(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const a = this._parse(e);
    if ($(a))
      throw new Error("Synchronous parse encountered promise.");
    return a;
  }
  _parseAsync(e) {
    const a = this._parse(e);
    return Promise.resolve(a);
  }
  parse(e, a) {
    const s = this.safeParse(e, a);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, a) {
    const s = {
      common: {
        issues: [],
        async: (a == null ? void 0 : a.async) ?? !1,
        contextualErrorMap: a == null ? void 0 : a.errorMap
      },
      path: (a == null ? void 0 : a.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: C(e)
    }, i = this._parseSync({ data: e, path: s.path, parent: s });
    return ie(s, i);
  }
  "~validate"(e) {
    var s, i;
    const a = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: C(e)
    };
    if (!this["~standard"].async)
      try {
        const n = this._parseSync({ data: e, path: [], parent: a });
        return z(n) ? {
          value: n.value
        } : {
          issues: a.common.issues
        };
      } catch (n) {
        (i = (s = n == null ? void 0 : n.message) == null ? void 0 : s.toLowerCase()) != null && i.includes("encountered") && (this["~standard"].async = !0), a.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: a }).then((n) => z(n) ? {
      value: n.value
    } : {
      issues: a.common.issues
    });
  }
  async parseAsync(e, a) {
    const s = await this.safeParseAsync(e, a);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, a) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: a == null ? void 0 : a.errorMap,
        async: !0
      },
      path: (a == null ? void 0 : a.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: C(e)
    }, i = this._parse({ data: e, path: s.path, parent: s }), n = await ($(i) ? i : Promise.resolve(i));
    return ie(s, n);
  }
  refine(e, a) {
    const s = (i) => typeof a == "string" || typeof a > "u" ? { message: a } : typeof a == "function" ? a(i) : a;
    return this._refinement((i, n) => {
      const r = e(i), o = () => n.addIssue({
        code: l.custom,
        ...s(i)
      });
      return typeof Promise < "u" && r instanceof Promise ? r.then((m) => m ? !0 : (o(), !1)) : r ? !0 : (o(), !1);
    });
  }
  refinement(e, a) {
    return this._refinement((s, i) => e(s) ? !0 : (i.addIssue(typeof a == "function" ? a(s, i) : a), !1));
  }
  _refinement(e) {
    return new M({
      schema: this,
      typeName: f.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (a) => this["~validate"](a)
    };
  }
  optional() {
    return j.create(this, this._def);
  }
  nullable() {
    return D.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return P.create(this);
  }
  promise() {
    return U.create(this, this._def);
  }
  or(e) {
    return F.create([this, e], this._def);
  }
  and(e) {
    return H.create(this, e, this._def);
  }
  transform(e) {
    return new M({
      ...p(this._def),
      schema: this,
      typeName: f.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const a = typeof e == "function" ? e : () => e;
    return new J({
      ...p(this._def),
      innerType: this,
      defaultValue: a,
      typeName: f.ZodDefault
    });
  }
  brand() {
    return new Qe({
      typeName: f.ZodBranded,
      type: this,
      ...p(this._def)
    });
  }
  catch(e) {
    const a = typeof e == "function" ? e : () => e;
    return new Q({
      ...p(this._def),
      innerType: this,
      catchValue: a,
      typeName: f.ZodCatch
    });
  }
  describe(e) {
    const a = this.constructor;
    return new a({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ee.create(this, e);
  }
  readonly() {
    return X.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Ee = /^c[^\s-]{8,}$/i, Re = /^[0-9a-z]+$/, Te = /^[0-9A-HJKMNP-TV-Z]{26}$/i, ze = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Oe = /^[a-z0-9_-]{21}$/i, Me = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, De = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Ne = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ze = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let W;
const Be = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Le = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Ye = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, $e = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Ve = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Fe = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ye = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", He = new RegExp(`^${ye}$`);
function be(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const a = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${a}`;
}
function Ue(t) {
  return new RegExp(`^${be(t)}$`);
}
function We(t) {
  let e = `${ye}T${be(t)}`;
  const a = [];
  return a.push(t.local ? "Z?" : "Z"), t.offset && a.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${a.join("|")})`, new RegExp(`^${e}$`);
}
function Ge(t, e) {
  return !!((e === "v4" || !e) && Be.test(t) || (e === "v6" || !e) && Ye.test(t));
}
function qe(t, e) {
  if (!Me.test(t))
    return !1;
  try {
    const [a] = t.split(".");
    if (!a)
      return !1;
    const s = a.replace(/-/g, "+").replace(/_/g, "/").padEnd(a.length + (4 - a.length % 4) % 4, "="), i = JSON.parse(atob(s));
    return !(typeof i != "object" || i === null || "typ" in i && (i == null ? void 0 : i.typ) !== "JWT" || !i.alg || e && i.alg !== e);
  } catch {
    return !1;
  }
}
function Ke(t, e) {
  return !!((e === "v4" || !e) && Le.test(t) || (e === "v6" || !e) && $e.test(t));
}
class S extends y {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== d.string) {
      const n = this._getOrReturnCtx(e);
      return c(n, {
        code: l.invalid_type,
        expected: d.string,
        received: n.parsedType
      }), g;
    }
    const s = new _();
    let i;
    for (const n of this._def.checks)
      if (n.kind === "min")
        e.data.length < n.value && (i = this._getOrReturnCtx(e, i), c(i, {
          code: l.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), s.dirty());
      else if (n.kind === "max")
        e.data.length > n.value && (i = this._getOrReturnCtx(e, i), c(i, {
          code: l.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: n.message
        }), s.dirty());
      else if (n.kind === "length") {
        const r = e.data.length > n.value, o = e.data.length < n.value;
        (r || o) && (i = this._getOrReturnCtx(e, i), r ? c(i, {
          code: l.too_big,
          maximum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }) : o && c(i, {
          code: l.too_small,
          minimum: n.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: n.message
        }), s.dirty());
      } else if (n.kind === "email")
        Ne.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "email",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "emoji")
        W || (W = new RegExp(Ze, "u")), W.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "emoji",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "uuid")
        ze.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "uuid",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "nanoid")
        Oe.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "nanoid",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "cuid")
        Ee.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "cuid",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "cuid2")
        Re.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "cuid2",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "ulid")
        Te.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
          validation: "ulid",
          code: l.invalid_string,
          message: n.message
        }), s.dirty());
      else if (n.kind === "url")
        try {
          new URL(e.data);
        } catch {
          i = this._getOrReturnCtx(e, i), c(i, {
            validation: "url",
            code: l.invalid_string,
            message: n.message
          }), s.dirty();
        }
      else n.kind === "regex" ? (n.regex.lastIndex = 0, n.regex.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "regex",
        code: l.invalid_string,
        message: n.message
      }), s.dirty())) : n.kind === "trim" ? e.data = e.data.trim() : n.kind === "includes" ? e.data.includes(n.value, n.position) || (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.invalid_string,
        validation: { includes: n.value, position: n.position },
        message: n.message
      }), s.dirty()) : n.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : n.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : n.kind === "startsWith" ? e.data.startsWith(n.value) || (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.invalid_string,
        validation: { startsWith: n.value },
        message: n.message
      }), s.dirty()) : n.kind === "endsWith" ? e.data.endsWith(n.value) || (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.invalid_string,
        validation: { endsWith: n.value },
        message: n.message
      }), s.dirty()) : n.kind === "datetime" ? We(n).test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.invalid_string,
        validation: "datetime",
        message: n.message
      }), s.dirty()) : n.kind === "date" ? He.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.invalid_string,
        validation: "date",
        message: n.message
      }), s.dirty()) : n.kind === "time" ? Ue(n).test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.invalid_string,
        validation: "time",
        message: n.message
      }), s.dirty()) : n.kind === "duration" ? De.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "duration",
        code: l.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "ip" ? Ge(e.data, n.version) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "ip",
        code: l.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "jwt" ? qe(e.data, n.alg) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "jwt",
        code: l.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "cidr" ? Ke(e.data, n.version) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "cidr",
        code: l.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "base64" ? Ve.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "base64",
        code: l.invalid_string,
        message: n.message
      }), s.dirty()) : n.kind === "base64url" ? Fe.test(e.data) || (i = this._getOrReturnCtx(e, i), c(i, {
        validation: "base64url",
        code: l.invalid_string,
        message: n.message
      }), s.dirty()) : b.assertNever(n);
    return { status: s.value, value: e.data };
  }
  _regex(e, a, s) {
    return this.refinement((i) => e.test(i), {
      validation: a,
      code: l.invalid_string,
      ...u.errToObj(s)
    });
  }
  _addCheck(e) {
    return new S({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...u.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...u.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...u.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...u.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...u.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...u.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...u.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...u.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...u.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...u.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...u.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...u.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...u.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (e == null ? void 0 : e.offset) ?? !1,
      local: (e == null ? void 0 : e.local) ?? !1,
      ...u.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...u.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...u.errToObj(e) });
  }
  regex(e, a) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...u.errToObj(a)
    });
  }
  includes(e, a) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: a == null ? void 0 : a.position,
      ...u.errToObj(a == null ? void 0 : a.message)
    });
  }
  startsWith(e, a) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...u.errToObj(a)
    });
  }
  endsWith(e, a) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...u.errToObj(a)
    });
  }
  min(e, a) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...u.errToObj(a)
    });
  }
  max(e, a) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...u.errToObj(a)
    });
  }
  length(e, a) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...u.errToObj(a)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, u.errToObj(e));
  }
  trim() {
    return new S({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new S({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new S({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "min" && (e === null || a.value > e) && (e = a.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "max" && (e === null || a.value < e) && (e = a.value);
    return e;
  }
}
S.create = (t) => new S({
  checks: [],
  typeName: f.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...p(t)
});
function Je(t, e) {
  const a = (t.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, i = a > s ? a : s, n = Number.parseInt(t.toFixed(i).replace(".", "")), r = Number.parseInt(e.toFixed(i).replace(".", ""));
  return n % r / 10 ** i;
}
class B extends y {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== d.number) {
      const n = this._getOrReturnCtx(e);
      return c(n, {
        code: l.invalid_type,
        expected: d.number,
        received: n.parsedType
      }), g;
    }
    let s;
    const i = new _();
    for (const n of this._def.checks)
      n.kind === "int" ? b.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: n.message
      }), i.dirty()) : n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.too_small,
        minimum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.too_big,
        maximum: n.value,
        type: "number",
        inclusive: n.inclusive,
        exact: !1,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? Je(e.data, n.value) !== 0 && (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : n.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.not_finite,
        message: n.message
      }), i.dirty()) : b.assertNever(n);
    return { status: i.value, value: e.data };
  }
  gte(e, a) {
    return this.setLimit("min", e, !0, u.toString(a));
  }
  gt(e, a) {
    return this.setLimit("min", e, !1, u.toString(a));
  }
  lte(e, a) {
    return this.setLimit("max", e, !0, u.toString(a));
  }
  lt(e, a) {
    return this.setLimit("max", e, !1, u.toString(a));
  }
  setLimit(e, a, s, i) {
    return new B({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: a,
          inclusive: s,
          message: u.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new B({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: u.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: u.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: u.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: u.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: u.toString(e)
    });
  }
  multipleOf(e, a) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: u.toString(a)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: u.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: u.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: u.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "min" && (e === null || a.value > e) && (e = a.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "max" && (e === null || a.value < e) && (e = a.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && b.isInteger(e.value));
  }
  get isFinite() {
    let e = null, a = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (a === null || s.value > a) && (a = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(a) && Number.isFinite(e);
  }
}
B.create = (t) => new B({
  checks: [],
  typeName: f.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...p(t)
});
class L extends y {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== d.bigint)
      return this._getInvalidInput(e);
    let s;
    const i = new _();
    for (const n of this._def.checks)
      n.kind === "min" ? (n.inclusive ? e.data < n.value : e.data <= n.value) && (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.too_small,
        type: "bigint",
        minimum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "max" ? (n.inclusive ? e.data > n.value : e.data >= n.value) && (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.too_big,
        type: "bigint",
        maximum: n.value,
        inclusive: n.inclusive,
        message: n.message
      }), i.dirty()) : n.kind === "multipleOf" ? e.data % n.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), c(s, {
        code: l.not_multiple_of,
        multipleOf: n.value,
        message: n.message
      }), i.dirty()) : b.assertNever(n);
    return { status: i.value, value: e.data };
  }
  _getInvalidInput(e) {
    const a = this._getOrReturnCtx(e);
    return c(a, {
      code: l.invalid_type,
      expected: d.bigint,
      received: a.parsedType
    }), g;
  }
  gte(e, a) {
    return this.setLimit("min", e, !0, u.toString(a));
  }
  gt(e, a) {
    return this.setLimit("min", e, !1, u.toString(a));
  }
  lte(e, a) {
    return this.setLimit("max", e, !0, u.toString(a));
  }
  lt(e, a) {
    return this.setLimit("max", e, !1, u.toString(a));
  }
  setLimit(e, a, s, i) {
    return new L({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: a,
          inclusive: s,
          message: u.toString(i)
        }
      ]
    });
  }
  _addCheck(e) {
    return new L({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: u.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: u.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: u.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: u.toString(e)
    });
  }
  multipleOf(e, a) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: u.toString(a)
    });
  }
  get minValue() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "min" && (e === null || a.value > e) && (e = a.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "max" && (e === null || a.value < e) && (e = a.value);
    return e;
  }
}
L.create = (t) => new L({
  checks: [],
  typeName: f.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...p(t)
});
class ne extends y {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== d.boolean) {
      const s = this._getOrReturnCtx(e);
      return c(s, {
        code: l.invalid_type,
        expected: d.boolean,
        received: s.parsedType
      }), g;
    }
    return w(e.data);
  }
}
ne.create = (t) => new ne({
  typeName: f.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...p(t)
});
class V extends y {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== d.date) {
      const n = this._getOrReturnCtx(e);
      return c(n, {
        code: l.invalid_type,
        expected: d.date,
        received: n.parsedType
      }), g;
    }
    if (Number.isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return c(n, {
        code: l.invalid_date
      }), g;
    }
    const s = new _();
    let i;
    for (const n of this._def.checks)
      n.kind === "min" ? e.data.getTime() < n.value && (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.too_small,
        message: n.message,
        inclusive: !0,
        exact: !1,
        minimum: n.value,
        type: "date"
      }), s.dirty()) : n.kind === "max" ? e.data.getTime() > n.value && (i = this._getOrReturnCtx(e, i), c(i, {
        code: l.too_big,
        message: n.message,
        inclusive: !0,
        exact: !1,
        maximum: n.value,
        type: "date"
      }), s.dirty()) : b.assertNever(n);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new V({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, a) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: u.toString(a)
    });
  }
  max(e, a) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: u.toString(a)
    });
  }
  get minDate() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "min" && (e === null || a.value > e) && (e = a.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const a of this._def.checks)
      a.kind === "max" && (e === null || a.value < e) && (e = a.value);
    return e != null ? new Date(e) : null;
  }
}
V.create = (t) => new V({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: f.ZodDate,
  ...p(t)
});
class re extends y {
  _parse(e) {
    if (this._getType(e) !== d.symbol) {
      const s = this._getOrReturnCtx(e);
      return c(s, {
        code: l.invalid_type,
        expected: d.symbol,
        received: s.parsedType
      }), g;
    }
    return w(e.data);
  }
}
re.create = (t) => new re({
  typeName: f.ZodSymbol,
  ...p(t)
});
class oe extends y {
  _parse(e) {
    if (this._getType(e) !== d.undefined) {
      const s = this._getOrReturnCtx(e);
      return c(s, {
        code: l.invalid_type,
        expected: d.undefined,
        received: s.parsedType
      }), g;
    }
    return w(e.data);
  }
}
oe.create = (t) => new oe({
  typeName: f.ZodUndefined,
  ...p(t)
});
class le extends y {
  _parse(e) {
    if (this._getType(e) !== d.null) {
      const s = this._getOrReturnCtx(e);
      return c(s, {
        code: l.invalid_type,
        expected: d.null,
        received: s.parsedType
      }), g;
    }
    return w(e.data);
  }
}
le.create = (t) => new le({
  typeName: f.ZodNull,
  ...p(t)
});
class ce extends y {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return w(e.data);
  }
}
ce.create = (t) => new ce({
  typeName: f.ZodAny,
  ...p(t)
});
class de extends y {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return w(e.data);
  }
}
de.create = (t) => new de({
  typeName: f.ZodUnknown,
  ...p(t)
});
class I extends y {
  _parse(e) {
    const a = this._getOrReturnCtx(e);
    return c(a, {
      code: l.invalid_type,
      expected: d.never,
      received: a.parsedType
    }), g;
  }
}
I.create = (t) => new I({
  typeName: f.ZodNever,
  ...p(t)
});
class ue extends y {
  _parse(e) {
    if (this._getType(e) !== d.undefined) {
      const s = this._getOrReturnCtx(e);
      return c(s, {
        code: l.invalid_type,
        expected: d.void,
        received: s.parsedType
      }), g;
    }
    return w(e.data);
  }
}
ue.create = (t) => new ue({
  typeName: f.ZodVoid,
  ...p(t)
});
class P extends y {
  _parse(e) {
    const { ctx: a, status: s } = this._processInputParams(e), i = this._def;
    if (a.parsedType !== d.array)
      return c(a, {
        code: l.invalid_type,
        expected: d.array,
        received: a.parsedType
      }), g;
    if (i.exactLength !== null) {
      const r = a.data.length > i.exactLength.value, o = a.data.length < i.exactLength.value;
      (r || o) && (c(a, {
        code: r ? l.too_big : l.too_small,
        minimum: o ? i.exactLength.value : void 0,
        maximum: r ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), s.dirty());
    }
    if (i.minLength !== null && a.data.length < i.minLength.value && (c(a, {
      code: l.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), s.dirty()), i.maxLength !== null && a.data.length > i.maxLength.value && (c(a, {
      code: l.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), s.dirty()), a.common.async)
      return Promise.all([...a.data].map((r, o) => i.type._parseAsync(new A(a, r, a.path, o)))).then((r) => _.mergeArray(s, r));
    const n = [...a.data].map((r, o) => i.type._parseSync(new A(a, r, a.path, o)));
    return _.mergeArray(s, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, a) {
    return new P({
      ...this._def,
      minLength: { value: e, message: u.toString(a) }
    });
  }
  max(e, a) {
    return new P({
      ...this._def,
      maxLength: { value: e, message: u.toString(a) }
    });
  }
  length(e, a) {
    return new P({
      ...this._def,
      exactLength: { value: e, message: u.toString(a) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
P.create = (t, e) => new P({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: f.ZodArray,
  ...p(e)
});
function T(t) {
  if (t instanceof k) {
    const e = {};
    for (const a in t.shape) {
      const s = t.shape[a];
      e[a] = j.create(T(s));
    }
    return new k({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof P ? new P({
    ...t._def,
    type: T(t.element)
  }) : t instanceof j ? j.create(T(t.unwrap())) : t instanceof D ? D.create(T(t.unwrap())) : t instanceof E ? E.create(t.items.map((e) => T(e))) : t;
}
class k extends y {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), a = b.objectKeys(e);
    return this._cached = { shape: e, keys: a }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== d.object) {
      const h = this._getOrReturnCtx(e);
      return c(h, {
        code: l.invalid_type,
        expected: d.object,
        received: h.parsedType
      }), g;
    }
    const { status: s, ctx: i } = this._processInputParams(e), { shape: n, keys: r } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof I && this._def.unknownKeys === "strip"))
      for (const h in i.data)
        r.includes(h) || o.push(h);
    const m = [];
    for (const h of r) {
      const v = n[h], N = i.data[h];
      m.push({
        key: { status: "valid", value: h },
        value: v._parse(new A(i, N, i.path, h)),
        alwaysSet: h in i.data
      });
    }
    if (this._def.catchall instanceof I) {
      const h = this._def.unknownKeys;
      if (h === "passthrough")
        for (const v of o)
          m.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: i.data[v] }
          });
      else if (h === "strict")
        o.length > 0 && (c(i, {
          code: l.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (h !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const h = this._def.catchall;
      for (const v of o) {
        const N = i.data[v];
        m.push({
          key: { status: "valid", value: v },
          value: h._parse(
            new A(i, N, i.path, v)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: v in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const h = [];
      for (const v of m) {
        const N = await v.key, Pe = await v.value;
        h.push({
          key: N,
          value: Pe,
          alwaysSet: v.alwaysSet
        });
      }
      return h;
    }).then((h) => _.mergeObjectSync(s, h)) : _.mergeObjectSync(s, m);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return u.errToObj, new k({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (a, s) => {
          var n, r;
          const i = ((r = (n = this._def).errorMap) == null ? void 0 : r.call(n, a, s).message) ?? s.defaultError;
          return a.code === "unrecognized_keys" ? {
            message: u.errToObj(e).message ?? i
          } : {
            message: i
          };
        }
      } : {}
    });
  }
  strip() {
    return new k({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new k({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new k({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new k({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: f.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, a) {
    return this.augment({ [e]: a });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new k({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const a = {};
    for (const s of b.objectKeys(e))
      e[s] && this.shape[s] && (a[s] = this.shape[s]);
    return new k({
      ...this._def,
      shape: () => a
    });
  }
  omit(e) {
    const a = {};
    for (const s of b.objectKeys(this.shape))
      e[s] || (a[s] = this.shape[s]);
    return new k({
      ...this._def,
      shape: () => a
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return T(this);
  }
  partial(e) {
    const a = {};
    for (const s of b.objectKeys(this.shape)) {
      const i = this.shape[s];
      e && !e[s] ? a[s] = i : a[s] = i.optional();
    }
    return new k({
      ...this._def,
      shape: () => a
    });
  }
  required(e) {
    const a = {};
    for (const s of b.objectKeys(this.shape))
      if (e && !e[s])
        a[s] = this.shape[s];
      else {
        let n = this.shape[s];
        for (; n instanceof j; )
          n = n._def.innerType;
        a[s] = n;
      }
    return new k({
      ...this._def,
      shape: () => a
    });
  }
  keyof() {
    return ve(b.objectKeys(this.shape));
  }
}
k.create = (t, e) => new k({
  shape: () => t,
  unknownKeys: "strip",
  catchall: I.create(),
  typeName: f.ZodObject,
  ...p(e)
});
k.strictCreate = (t, e) => new k({
  shape: () => t,
  unknownKeys: "strict",
  catchall: I.create(),
  typeName: f.ZodObject,
  ...p(e)
});
k.lazycreate = (t, e) => new k({
  shape: t,
  unknownKeys: "strip",
  catchall: I.create(),
  typeName: f.ZodObject,
  ...p(e)
});
class F extends y {
  _parse(e) {
    const { ctx: a } = this._processInputParams(e), s = this._def.options;
    function i(n) {
      for (const o of n)
        if (o.result.status === "valid")
          return o.result;
      for (const o of n)
        if (o.result.status === "dirty")
          return a.common.issues.push(...o.ctx.common.issues), o.result;
      const r = n.map((o) => new x(o.ctx.common.issues));
      return c(a, {
        code: l.invalid_union,
        unionErrors: r
      }), g;
    }
    if (a.common.async)
      return Promise.all(s.map(async (n) => {
        const r = {
          ...a,
          common: {
            ...a.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await n._parseAsync({
            data: a.data,
            path: a.path,
            parent: r
          }),
          ctx: r
        };
      })).then(i);
    {
      let n;
      const r = [];
      for (const m of s) {
        const h = {
          ...a,
          common: {
            ...a.common,
            issues: []
          },
          parent: null
        }, v = m._parseSync({
          data: a.data,
          path: a.path,
          parent: h
        });
        if (v.status === "valid")
          return v;
        v.status === "dirty" && !n && (n = { result: v, ctx: h }), h.common.issues.length && r.push(h.common.issues);
      }
      if (n)
        return a.common.issues.push(...n.ctx.common.issues), n.result;
      const o = r.map((m) => new x(m));
      return c(a, {
        code: l.invalid_union,
        unionErrors: o
      }), g;
    }
  }
  get options() {
    return this._def.options;
  }
}
F.create = (t, e) => new F({
  options: t,
  typeName: f.ZodUnion,
  ...p(e)
});
function K(t, e) {
  const a = C(t), s = C(e);
  if (t === e)
    return { valid: !0, data: t };
  if (a === d.object && s === d.object) {
    const i = b.objectKeys(e), n = b.objectKeys(t).filter((o) => i.indexOf(o) !== -1), r = { ...t, ...e };
    for (const o of n) {
      const m = K(t[o], e[o]);
      if (!m.valid)
        return { valid: !1 };
      r[o] = m.data;
    }
    return { valid: !0, data: r };
  } else if (a === d.array && s === d.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const i = [];
    for (let n = 0; n < t.length; n++) {
      const r = t[n], o = e[n], m = K(r, o);
      if (!m.valid)
        return { valid: !1 };
      i.push(m.data);
    }
    return { valid: !0, data: i };
  } else return a === d.date && s === d.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class H extends y {
  _parse(e) {
    const { status: a, ctx: s } = this._processInputParams(e), i = (n, r) => {
      if (te(n) || te(r))
        return g;
      const o = K(n.value, r.value);
      return o.valid ? ((se(n) || se(r)) && a.dirty(), { status: a.value, value: o.data }) : (c(s, {
        code: l.invalid_intersection_types
      }), g);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([n, r]) => i(n, r)) : i(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
H.create = (t, e, a) => new H({
  left: t,
  right: e,
  typeName: f.ZodIntersection,
  ...p(a)
});
class E extends y {
  _parse(e) {
    const { status: a, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.array)
      return c(s, {
        code: l.invalid_type,
        expected: d.array,
        received: s.parsedType
      }), g;
    if (s.data.length < this._def.items.length)
      return c(s, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), g;
    !this._def.rest && s.data.length > this._def.items.length && (c(s, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), a.dirty());
    const n = [...s.data].map((r, o) => {
      const m = this._def.items[o] || this._def.rest;
      return m ? m._parse(new A(s, r, s.path, o)) : null;
    }).filter((r) => !!r);
    return s.common.async ? Promise.all(n).then((r) => _.mergeArray(a, r)) : _.mergeArray(a, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new E({
      ...this._def,
      rest: e
    });
  }
}
E.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new E({
    items: t,
    typeName: f.ZodTuple,
    rest: null,
    ...p(e)
  });
};
class me extends y {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: a, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.map)
      return c(s, {
        code: l.invalid_type,
        expected: d.map,
        received: s.parsedType
      }), g;
    const i = this._def.keyType, n = this._def.valueType, r = [...s.data.entries()].map(([o, m], h) => ({
      key: i._parse(new A(s, o, s.path, [h, "key"])),
      value: n._parse(new A(s, m, s.path, [h, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const m of r) {
          const h = await m.key, v = await m.value;
          if (h.status === "aborted" || v.status === "aborted")
            return g;
          (h.status === "dirty" || v.status === "dirty") && a.dirty(), o.set(h.value, v.value);
        }
        return { status: a.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const m of r) {
        const h = m.key, v = m.value;
        if (h.status === "aborted" || v.status === "aborted")
          return g;
        (h.status === "dirty" || v.status === "dirty") && a.dirty(), o.set(h.value, v.value);
      }
      return { status: a.value, value: o };
    }
  }
}
me.create = (t, e, a) => new me({
  valueType: e,
  keyType: t,
  typeName: f.ZodMap,
  ...p(a)
});
class Y extends y {
  _parse(e) {
    const { status: a, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.set)
      return c(s, {
        code: l.invalid_type,
        expected: d.set,
        received: s.parsedType
      }), g;
    const i = this._def;
    i.minSize !== null && s.data.size < i.minSize.value && (c(s, {
      code: l.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), a.dirty()), i.maxSize !== null && s.data.size > i.maxSize.value && (c(s, {
      code: l.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), a.dirty());
    const n = this._def.valueType;
    function r(m) {
      const h = /* @__PURE__ */ new Set();
      for (const v of m) {
        if (v.status === "aborted")
          return g;
        v.status === "dirty" && a.dirty(), h.add(v.value);
      }
      return { status: a.value, value: h };
    }
    const o = [...s.data.values()].map((m, h) => n._parse(new A(s, m, s.path, h)));
    return s.common.async ? Promise.all(o).then((m) => r(m)) : r(o);
  }
  min(e, a) {
    return new Y({
      ...this._def,
      minSize: { value: e, message: u.toString(a) }
    });
  }
  max(e, a) {
    return new Y({
      ...this._def,
      maxSize: { value: e, message: u.toString(a) }
    });
  }
  size(e, a) {
    return this.min(e, a).max(e, a);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Y.create = (t, e) => new Y({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: f.ZodSet,
  ...p(e)
});
class he extends y {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: a } = this._processInputParams(e);
    return this._def.getter()._parse({ data: a.data, path: a.path, parent: a });
  }
}
he.create = (t, e) => new he({
  getter: t,
  typeName: f.ZodLazy,
  ...p(e)
});
class ge extends y {
  _parse(e) {
    if (e.data !== this._def.value) {
      const a = this._getOrReturnCtx(e);
      return c(a, {
        received: a.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), g;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
ge.create = (t, e) => new ge({
  value: t,
  typeName: f.ZodLiteral,
  ...p(e)
});
function ve(t, e) {
  return new O({
    values: t,
    typeName: f.ZodEnum,
    ...p(e)
  });
}
class O extends y {
  _parse(e) {
    if (typeof e.data != "string") {
      const a = this._getOrReturnCtx(e), s = this._def.values;
      return c(a, {
        expected: b.joinValues(s),
        received: a.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const a = this._getOrReturnCtx(e), s = this._def.values;
      return c(a, {
        received: a.data,
        code: l.invalid_enum_value,
        options: s
      }), g;
    }
    return w(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const a of this._def.values)
      e[a] = a;
    return e;
  }
  get Values() {
    const e = {};
    for (const a of this._def.values)
      e[a] = a;
    return e;
  }
  get Enum() {
    const e = {};
    for (const a of this._def.values)
      e[a] = a;
    return e;
  }
  extract(e, a = this._def) {
    return O.create(e, {
      ...this._def,
      ...a
    });
  }
  exclude(e, a = this._def) {
    return O.create(this.options.filter((s) => !e.includes(s)), {
      ...this._def,
      ...a
    });
  }
}
O.create = ve;
class fe extends y {
  _parse(e) {
    const a = b.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== d.string && s.parsedType !== d.number) {
      const i = b.objectValues(a);
      return c(s, {
        expected: b.joinValues(i),
        received: s.parsedType,
        code: l.invalid_type
      }), g;
    }
    if (this._cache || (this._cache = new Set(b.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const i = b.objectValues(a);
      return c(s, {
        received: s.data,
        code: l.invalid_enum_value,
        options: i
      }), g;
    }
    return w(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
fe.create = (t, e) => new fe({
  values: t,
  typeName: f.ZodNativeEnum,
  ...p(e)
});
class U extends y {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: a } = this._processInputParams(e);
    if (a.parsedType !== d.promise && a.common.async === !1)
      return c(a, {
        code: l.invalid_type,
        expected: d.promise,
        received: a.parsedType
      }), g;
    const s = a.parsedType === d.promise ? a.data : Promise.resolve(a.data);
    return w(s.then((i) => this._def.type.parseAsync(i, {
      path: a.path,
      errorMap: a.common.contextualErrorMap
    })));
  }
}
U.create = (t, e) => new U({
  type: t,
  typeName: f.ZodPromise,
  ...p(e)
});
class M extends y {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === f.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: a, ctx: s } = this._processInputParams(e), i = this._def.effect || null, n = {
      addIssue: (r) => {
        c(s, r), r.fatal ? a.abort() : a.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (n.addIssue = n.addIssue.bind(n), i.type === "preprocess") {
      const r = i.transform(s.data, n);
      if (s.common.async)
        return Promise.resolve(r).then(async (o) => {
          if (a.value === "aborted")
            return g;
          const m = await this._def.schema._parseAsync({
            data: o,
            path: s.path,
            parent: s
          });
          return m.status === "aborted" ? g : m.status === "dirty" || a.value === "dirty" ? Z(m.value) : m;
        });
      {
        if (a.value === "aborted")
          return g;
        const o = this._def.schema._parseSync({
          data: r,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? g : o.status === "dirty" || a.value === "dirty" ? Z(o.value) : o;
      }
    }
    if (i.type === "refinement") {
      const r = (o) => {
        const m = i.refinement(o, n);
        if (s.common.async)
          return Promise.resolve(m);
        if (m instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? g : (o.status === "dirty" && a.dirty(), r(o.value), { status: a.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? g : (o.status === "dirty" && a.dirty(), r(o.value).then(() => ({ status: a.value, value: o.value }))));
    }
    if (i.type === "transform")
      if (s.common.async === !1) {
        const r = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!z(r))
          return g;
        const o = i.transform(r.value, n);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: a.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((r) => z(r) ? Promise.resolve(i.transform(r.value, n)).then((o) => ({
          status: a.value,
          value: o
        })) : g);
    b.assertNever(i);
  }
}
M.create = (t, e, a) => new M({
  schema: t,
  typeName: f.ZodEffects,
  effect: e,
  ...p(a)
});
M.createWithPreprocess = (t, e, a) => new M({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: f.ZodEffects,
  ...p(a)
});
class j extends y {
  _parse(e) {
    return this._getType(e) === d.undefined ? w(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
j.create = (t, e) => new j({
  innerType: t,
  typeName: f.ZodOptional,
  ...p(e)
});
class D extends y {
  _parse(e) {
    return this._getType(e) === d.null ? w(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
D.create = (t, e) => new D({
  innerType: t,
  typeName: f.ZodNullable,
  ...p(e)
});
class J extends y {
  _parse(e) {
    const { ctx: a } = this._processInputParams(e);
    let s = a.data;
    return a.parsedType === d.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: a.path,
      parent: a
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
J.create = (t, e) => new J({
  innerType: t,
  typeName: f.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...p(e)
});
class Q extends y {
  _parse(e) {
    const { ctx: a } = this._processInputParams(e), s = {
      ...a,
      common: {
        ...a.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return $(i) ? i.then((n) => ({
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new x(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new x(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Q.create = (t, e) => new Q({
  innerType: t,
  typeName: f.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...p(e)
});
class pe extends y {
  _parse(e) {
    if (this._getType(e) !== d.nan) {
      const s = this._getOrReturnCtx(e);
      return c(s, {
        code: l.invalid_type,
        expected: d.nan,
        received: s.parsedType
      }), g;
    }
    return { status: "valid", value: e.data };
  }
}
pe.create = (t) => new pe({
  typeName: f.ZodNaN,
  ...p(t)
});
class Qe extends y {
  _parse(e) {
    const { ctx: a } = this._processInputParams(e), s = a.data;
    return this._def.type._parse({
      data: s,
      path: a.path,
      parent: a
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ee extends y {
  _parse(e) {
    const { status: a, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return n.status === "aborted" ? g : n.status === "dirty" ? (a.dirty(), Z(n.value)) : this._def.out._parseAsync({
          data: n.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const i = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return i.status === "aborted" ? g : i.status === "dirty" ? (a.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, a) {
    return new ee({
      in: e,
      out: a,
      typeName: f.ZodPipeline
    });
  }
}
class X extends y {
  _parse(e) {
    const a = this._def.innerType._parse(e), s = (i) => (z(i) && (i.value = Object.freeze(i.value)), i);
    return $(a) ? a.then((i) => s(i)) : s(a);
  }
  unwrap() {
    return this._def.innerType;
  }
}
X.create = (t, e) => new X({
  innerType: t,
  typeName: f.ZodReadonly,
  ...p(e)
});
var f;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(f || (f = {}));
const R = S.create;
I.create;
const Xe = P.create, ke = k.create;
F.create;
H.create;
E.create;
const _e = O.create;
U.create;
j.create;
D.create;
const ea = [
  "outcome",
  "effect",
  "stunt",
  "actor-base",
  "actor-role",
  "actor-special",
  "asset-base",
  "asset-modifier",
  "counter",
  "location",
  "encounter",
  "quest"
], aa = _e(ea), ta = ["en"], sa = _e(ta), ia = ke({
  family: aa,
  id: R().min(1),
  title: R().min(1),
  artworkPath: R().min(1).optional(),
  body: R().optional(),
  footer: R().optional(),
  deck: R().optional()
}), na = ke({
  locale: sa,
  cards: Xe(ia)
}), oa = (t) => na.parse(t), la = G.contentVersion, ca = "en", we = [...G.cards, ...G.medievalCards], da = (t, e) => we.find((a) => a.family === t && a.slug === e), ra = [
  { layout: "full", width: 629, height: 1024 },
  { layout: "full", width: 315, height: 512 },
  { layout: "compact", width: 157, height: 256 }
], ua = () => we.flatMap((t) => ra.map((e) => ({ ...t, ...e })));
export {
  na as a,
  ea as b,
  we as c,
  aa as d,
  sa as e,
  la as f,
  ia as g,
  ua as h,
  da as i,
  ta as j,
  ca as k,
  ra as s,
  oa as v
};
