from dialoguekit.platforms import FlaskSocketPlatform
from musicagent.src.bot.music_agent import MusicAgent

platform = FlaskSocketPlatform(MusicAgent)
platform.start()
